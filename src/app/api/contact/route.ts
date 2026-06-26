import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newContactMessage = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
      }
    });

    return NextResponse.json(newContactMessage, { status: 201 });
  } catch (error) {
    console.error("Failed to create contact message:", error);
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}
