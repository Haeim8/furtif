import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Récupérer un véhicule promotionnel par ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const promoVehicle = await prisma.promoVehicle.findUnique({
      where: { id },
    });

    if (!promoVehicle) {
      return NextResponse.json(
        { error: 'Véhicule promotionnel non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(promoVehicle);
  } catch (error: any) {
    console.error('Erreur GET /api/promo-vehicles/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du véhicule promotionnel' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un véhicule promotionnel
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, image, price, oldPrice, order, active, vehicleId } = body;

    const existingPromoVehicle = await prisma.promoVehicle.findUnique({
      where: { id },
    });

    if (!existingPromoVehicle) {
      return NextResponse.json(
        { error: 'Véhicule promotionnel non trouvé' },
        { status: 404 }
      );
    }

    const promoVehicle = await prisma.promoVehicle.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(image && { image }),
        ...(price && { price: parseFloat(price) }),
        ...(oldPrice !== undefined && { oldPrice: oldPrice ? parseFloat(oldPrice) : null }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
        ...(vehicleId !== undefined && { vehicleId }),
      },
    });

    return NextResponse.json(promoVehicle);
  } catch (error: any) {
    console.error('Erreur PUT /api/promo-vehicles/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du véhicule promotionnel' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un véhicule promotionnel
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingPromoVehicle = await prisma.promoVehicle.findUnique({
      where: { id },
    });

    if (!existingPromoVehicle) {
      return NextResponse.json(
        { error: 'Véhicule promotionnel non trouvé' },
        { status: 404 }
      );
    }

    await prisma.promoVehicle.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Véhicule promotionnel supprimé' });
  } catch (error: any) {
    console.error('Erreur DELETE /api/promo-vehicles/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du véhicule promotionnel' },
      { status: 500 }
    );
  }
}
