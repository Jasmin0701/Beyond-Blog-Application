import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const formattedPost = {
      ...post,
      tags: post.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      date: post.date.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
