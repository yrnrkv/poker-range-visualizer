import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const ranges = await prisma.range.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const result = ranges.map((r) => ({
      ...r,
      hands: JSON.parse(r.hands) as string[],
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch ranges:', error);
    return NextResponse.json({ error: 'Failed to fetch ranges' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { name: string; position?: string; hands: string[] };
    const { name, position, hands } = body;
    if (!name || !hands) {
      return NextResponse.json({ error: 'Name and hands are required' }, { status: 400 });
    }
    const range = await prisma.range.create({
      data: {
        name,
        position: position ?? null,
        hands: JSON.stringify(hands),
      },
    });
    return NextResponse.json({
      ...range,
      hands: JSON.parse(range.hands) as string[],
      createdAt: range.createdAt.toISOString(),
      updatedAt: range.updatedAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to save range:', error);
    return NextResponse.json({ error: 'Failed to save range' }, { status: 500 });
  }
}
