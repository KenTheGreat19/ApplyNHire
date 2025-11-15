import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET - Fetch all Jooble job ads (with optional status filter)
export async function GET(request: NextRequest) {
  try {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Fetch ads with optional status filter
    const where = status ? { status } : {};
    
    const [ads, total] = await Promise.all([
      prisma.joobleJobAd.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.joobleJobAd.count({ where }),
    ]);

    return NextResponse.json({
      ads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching Jooble ads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ads' },
      { status: 500 }
    );
  }
}
