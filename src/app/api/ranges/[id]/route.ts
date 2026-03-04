import { NextRequest, NextResponse } from 'next/server';
import { getRangeById, deleteRange } from '@/lib/storage';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const range = getRangeById(id);
    if (!range) {
      return NextResponse.json({ error: 'Range not found' }, { status: 404 });
    }
    return NextResponse.json(range);
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
    const deleted = deleteRange(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Range not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete range:', error);
    return NextResponse.json({ error: 'Failed to delete range' }, { status: 500 });
  }
}
