import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Récupérer un client par ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        postalCode: true,
        driverLicense: true,
        iban: true,
        createdAt: true,
        reservations: {
          include: {
            vehicle: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        problems: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error: any) {
    console.error('Erreur GET /api/clients/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du client' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un client
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      phone,
      address,
      city,
      postalCode,
      driverLicense,
      iban,
    } = body;

    const client = await prisma.user.update({
      where: { id },
      data: {
        name,
        phone,
        address,
        city,
        postalCode,
        driverLicense,
        iban,
      },
    });

    return NextResponse.json(client);
  } catch (error: any) {
    console.error('Erreur PUT /api/clients/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du client' },
      { status: 500 }
    );
  }
}
