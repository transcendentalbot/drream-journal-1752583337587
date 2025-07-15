// /app/api/dreams/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Dream } from '@prisma/client';

export async function GET() {
  try {
    const dreams = await prisma.dream.findMany();
    return NextResponse.json(dreams);
  } catch (error) {
    console.error('Error fetching dreams:', error);
    return NextResponse.json({ error: 'Failed to fetch dreams' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    // Validate input
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const dream: Dream = await prisma.dream.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(dream);
  } catch (error) {
    console.error('Error creating dream:', error);
    return NextResponse.json({ error: 'Failed to create dream' }, { status: 500 });
  }
}