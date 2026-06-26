import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { mockPosts } from './data'; // We'll keep this just for seeding if DB is empty

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || searchParams.get('q');
    const topic = searchParams.get('topic');

    // Seed database if empty
    const count = await prisma.post.count();
    if (count === 0) {
      for (const post of mockPosts) {
        await prisma.post.create({
          data: {
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            imageUrl: post.imageUrl,
            tags: post.tags.join(','),
            date: new Date(post.date),
          }
        });
      }
    }

    let whereClause: any = undefined;
    if (search || (topic && topic !== 'All')) {
      whereClause = { AND: [] };
      if (search) {
        whereClause.AND.push({
          OR: [
            { title: { contains: search } },
            { excerpt: { contains: search } },
            { tags: { contains: search } },
          ]
        });
      }
      if (topic && topic !== 'All') {
        whereClause.AND.push({
          tags: { contains: topic }
        });
      }
    }

    // Fetch posts from Prisma
    const posts = await prisma.post.findMany({
      orderBy: { date: 'desc' },
      where: whereClause
    });

    // Format tags back into an array to match the frontend expectation
    const formattedPosts = posts.map(post => ({
      ...post,
      tags: post.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      date: post.date.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author || 'Anonymous',
        imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        tags: (body.tags || []).join(','),
        date: new Date(),
      }
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
