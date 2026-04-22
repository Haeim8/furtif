import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Liste tous les véhicules promotionnels actifs
export async function GET(req: NextRequest) {
  try {
    const promoVehicles = await prisma.promoVehicle.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(promoVehicles);
  } catch (error: any) {
    console.error('Erreur GET /api/promo-vehicles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des véhicules promotionnels' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau véhicule promotionnel
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, image, price, oldPrice, order, active, vehicleId } = body;

    if (!name || !image || !price) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants (name, image, price)' },
        { status: 400 }
      );
    }

    const promoVehicle = await prisma.promoVehicle.create({
      data: {
        name,
        image,
        price: parseFloat(price),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        order: order || 0,
        active: active !== undefined ? active : true,
        vehicleId,
      },
    });

    return NextResponse.json(promoVehicle, { status: 201 });
  } catch (error: any) {
    console.error('Erreur POST /api/promo-vehicles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du véhicule promotionnel' },
      { status: 500 }
    );
  }
}
