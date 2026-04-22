import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Liste tous les clients
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    const where: any = {
      role: 'CLIENT',
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    const clients = await prisma.user.findMany({
      where,
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
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(clients);
  } catch (error: any) {
    console.error('Erreur GET /api/clients:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des clients' },
      { status: 500 }
    );
  }
}
