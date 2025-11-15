import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Track impression or click on a Jooble ad
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { type } = body; // "impression" or "click"

    if (!type || !['impression', 'click'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Use "impression" or "click"' },
        { status: 400 }
      );
    }

    // Update the corresponding counter
    const updateData = type === 'impression'
      ? { impressionsCount: { increment: 1 } }
      : { clicksCount: { increment: 1 } };

    await prisma.joobleJobAd.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking ad event:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
