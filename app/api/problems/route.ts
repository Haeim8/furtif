import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Liste tous les problèmes
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const problems = await prisma.problem.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(problems);
  } catch (error: any) {
    console.error('Erreur GET /api/problems:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des problèmes' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau problème
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      type,
      subject,
      description,
      photos,
    } = body;

    const problem = await prisma.problem.create({
      data: {
        userId,
        type,
        subject,
        description,
        photos: photos || [],
        status: 'OPEN',
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(problem, { status: 201 });
  } catch (error: any) {
    console.error('Erreur POST /api/problems:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du problème' },
      { status: 500 }
    );
  }
}
