import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Liste tous les véhicules
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Parse JSON strings back to arrays
    const vehiclesWithArrays = vehicles.map((v: any) => ({
      ...v,
      images: v.images ? JSON.parse(v.images) : [],
      features: v.features ? JSON.parse(v.features) : [],
    }));

    return NextResponse.json(vehiclesWithArrays);
  } catch (error: any) {
    console.error('Erreur GET /api/vehicles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des véhicules' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau véhicule
export async function POST(req: NextRequest) {
  try {
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

    const vehicle = await prisma.vehicle.create({
      data: {
        brand,
        model,
        year: parseInt(year),
        color,
        licensePlate,
        type,
        transmission,
        fuelType,
        seats: parseInt(seats),
        doors: parseInt(doors),
        fuelConsumption: parseFloat(fuelConsumption),
        pricePerDay: parseFloat(pricePerDay),
        deposit: parseFloat(deposit),
        images: images ? JSON.stringify(images) : null,
        mainImage: mainImage || images?.[0],
        features: features ? JSON.stringify(features) : null,
        status: status || 'AVAILABLE',
      },
    });

    // Parse JSON back to arrays for response
    const vehicleResponse = {
      ...vehicle,
      images: vehicle.images ? JSON.parse(vehicle.images as string) : [],
      features: vehicle.features ? JSON.parse(vehicle.features as string) : [],
    };

    return NextResponse.json(vehicleResponse, { status: 201 });
  } catch (error: any) {
    console.error('Erreur POST /api/vehicles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du véhicule' },
      { status: 500 }
    );
  }
}
