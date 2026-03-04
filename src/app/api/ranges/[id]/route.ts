import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const range = await prisma.range.findUnique({ where: { id } });
    if (!range) {
      return NextResponse.json({ error: 'Range not found' }, { status: 404 });
    }
    return NextResponse.json({
      ...range,
      hands: JSON.parse(range.hands) as string[],
      createdAt: range.createdAt.toISOString(),
      updatedAt: range.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('Failed to fetch range:', error);
    return NextResponse.json({ error: 'Failed to fetch range' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.range.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete range:', error);
    return NextResponse.json({ error: 'Failed to delete range' }, { status: 500 });
  }
}
