import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch approved Jooble job ads for public display
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    const random = searchParams.get('random') === 'true';

    let ads;

    if (random) {
      // Fetch random approved ads
      const allApprovedAds = await prisma.joobleJobAd.findMany({
        where: { status: 'approved' },
      });

      // Shuffle and take limit
      ads = allApprovedAds
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
    } else {
      // Fetch latest approved ads
      ads = await prisma.joobleJobAd.findMany({
        where: { status: 'approved' },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
    }

    return NextResponse.json({ ads });
  } catch (error) {
    console.error('Error fetching public Jooble ads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ads' },
      { status: 500 }
    );
  }
}
