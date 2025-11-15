import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// Server-side Jooble API integration - API key is NEVER exposed to client
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get search parameters from request
    const body = await request.json();
    const { keywords = '', location = '', page = 1 } = body;

    // Retrieve Jooble API key from environment (NEVER send to client)
    const JOOBLE_API_KEY = process.env.JOOBLE_API_KEY;
    const JOOBLE_API_URL = process.env.JOOBLE_API_URL || 'https://jooble.org/api/';

    if (!JOOBLE_API_KEY) {
      return NextResponse.json(
        { error: 'Jooble API key not configured' },
        { status: 500 }
      );
    }

    // Call Jooble API from server side
    const joobleResponse = await fetch(`${JOOBLE_API_URL}${JOOBLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keywords,
        location,
        page: page || 1,
      }),
    });

    if (!joobleResponse.ok) {
      throw new Error(`Jooble API error: ${joobleResponse.statusText}`);
    }

    const joobleData = await joobleResponse.json();

    // Store fetched jobs in database with "pending" status for admin review
    const jobs = joobleData.jobs || [];
    const savedJobs = [];

    for (const job of jobs) {
      try {
        // Check if job already exists (by joobleId or URL)
        const existingJob = await prisma.joobleJobAd.findFirst({
          where: {
            OR: [
              { joobleId: job.id?.toString() },
              { applyUrl: job.link },
            ],
          },
        });

        if (existingJob) {
          // Skip duplicate
          continue;
        }

        // Create new job ad with pending status
        const savedJob = await prisma.joobleJobAd.create({
          data: {
            joobleId: job.id?.toString(),
            title: job.title || 'Untitled Position',
            description: job.description || job.snippet || '',
            location: job.location || 'Location not specified',
            companyName: job.company || 'Company not specified',
            applyUrl: job.link,
            salary: job.salary || null,
            type: job.type || null,
            snippet: job.snippet || null,
            source: job.source || null,
            status: 'pending', // Requires admin approval
          },
        });

        savedJobs.push(savedJob);
      } catch (error) {
        console.error('Error saving job:', error);
        // Continue with next job
      }
    }

    return NextResponse.json({
      success: true,
      message: `Fetched ${jobs.length} jobs, saved ${savedJobs.length} new jobs for review`,
      totalResults: joobleData.totalCount || jobs.length,
      savedCount: savedJobs.length,
      jobs: savedJobs,
    });
  } catch (error) {
    console.error('Jooble fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs from Jooble' },
      { status: 500 }
    );
  }
}
