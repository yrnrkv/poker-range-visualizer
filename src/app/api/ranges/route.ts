import { NextRequest, NextResponse } from 'next/server';
import { getAllRanges, createRange } from '@/lib/storage';

export async function GET() {
  try {
    const ranges = getAllRanges();
    return NextResponse.json(ranges);
  } catch (error) {
    console.error('Failed to fetch ranges:', error);
    return NextResponse.json({ error: 'Failed to fetch ranges' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { name: string; position?: string; hands: string[] };
    const { name, position, hands } = body;
    if (!name || !hands || !Array.isArray(hands)) {
      return NextResponse.json({ error: 'Name and hands are required' }, { status: 400 });
    }
    const range = createRange(name, hands, position);
    return NextResponse.json(range, { status: 201 });
  } catch (error) {
    console.error('Failed to save range:', error);
    return NextResponse.json({ error: 'Failed to save range' }, { status: 500 });
  }
}
