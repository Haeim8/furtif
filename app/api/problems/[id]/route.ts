import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Récupérer un problème par ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const problem = await prisma.problem.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!problem) {
      return NextResponse.json(
        { error: 'Problème non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(problem);
  } catch (error: any) {
    console.error('Erreur GET /api/problems/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du problème' },
      { status: 500 }
    );
  }
}

// PUT - Répondre ou mettre à jour un problème
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, adminResponse, respondedBy } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (adminResponse) {
      updateData.adminResponse = adminResponse;
      updateData.respondedBy = respondedBy;
      updateData.respondedAt = new Date();
    }

    const problem = await prisma.problem.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
      },
    });

    return NextResponse.json(problem);
  } catch (error: any) {
    console.error('Erreur PUT /api/problems/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du problème' },
      { status: 500 }
    );
  }
}
