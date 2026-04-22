import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Récupérer un véhicule par ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        reservations: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      );
    }

    // Parse JSON strings back to arrays
    const vehicleResponse = {
      ...vehicle,
      images: vehicle.images ? JSON.parse(vehicle.images as string) : [],
      features: vehicle.features ? JSON.parse(vehicle.features as string) : [],
    };

    return NextResponse.json(vehicleResponse);
  } catch (error: any) {
    console.error('Erreur GET /api/vehicles/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du véhicule' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un véhicule
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      brand,
      model,
      year,
      color,
      licensePlate,
      type,
      transmission,
      fuelType,
      seats,
      doors,
      fuelConsumption,
      pricePerDay,
      deposit,
      images,
      mainImage,
      features,
      status,
    } = body;

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        brand,
        model,
        year: year ? parseInt(year) : undefined,
        color,
        licensePlate,
        type,
        transmission,
        fuelType,
        seats: seats ? parseInt(seats) : undefined,
        doors: doors ? parseInt(doors) : undefined,
        fuelConsumption: fuelConsumption ? parseFloat(fuelConsumption) : undefined,
        pricePerDay: pricePerDay ? parseFloat(pricePerDay) : undefined,
        deposit: deposit ? parseFloat(deposit) : undefined,
        images: images ? JSON.stringify(images) : undefined,
        mainImage,
        features: features ? JSON.stringify(features) : undefined,
        status,
      },
    });

    // Parse JSON back to arrays for response
    const vehicleResponse = {
      ...vehicle,
      images: vehicle.images ? JSON.parse(vehicle.images as string) : [],
      features: vehicle.features ? JSON.parse(vehicle.features as string) : [],
    };

    return NextResponse.json(vehicleResponse);
  } catch (error: any) {
    console.error('Erreur PUT /api/vehicles/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du véhicule' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un véhicule
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Véhicule supprimé avec succès' });
  } catch (error: any) {
    console.error('Erreur DELETE /api/vehicles/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du véhicule' },
      { status: 500 }
    );
  }
}
