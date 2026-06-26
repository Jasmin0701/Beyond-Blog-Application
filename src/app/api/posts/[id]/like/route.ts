import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const action = body.action || 'like';
    
    // Increment or decrement the likes field by 1
    const post = await prisma.post.update({
      where: { id },
      data: {
        likes: {
          increment: action === 'unlike' ? -1 : 1,
        },
      },
    });

    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    console.error("Failed to like/unlike post:", error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
