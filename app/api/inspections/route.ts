import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Liste toutes les inspections
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const validated = searchParams.get('validated');

    const where: any = {};
    if (type) where.type = type;
    if (validated !== null) where.validated = validated === 'true';

    const inspections = await prisma.inspection.findMany({
      where,
      include: {
        reservation: {
          include: {
            user: true,
            vehicle: true,
          },
        },
        vehicle: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Parse JSON strings back to arrays
    const inspectionsWithArrays = inspections.map((insp: any) => ({
      ...insp,
      photos: insp.photos ? JSON.parse(insp.photos) : [],
      vehicle: insp.vehicle ? {
        ...insp.vehicle,
        images: insp.vehicle.images ? JSON.parse(insp.vehicle.images) : [],
        features: insp.vehicle.features ? JSON.parse(insp.vehicle.features) : [],
      } : null,
      reservation: insp.reservation ? {
        ...insp.reservation,
        vehicle: insp.reservation.vehicle ? {
          ...insp.reservation.vehicle,
          images: insp.reservation.vehicle.images ? JSON.parse(insp.reservation.vehicle.images) : [],
          features: insp.reservation.vehicle.features ? JSON.parse(insp.reservation.vehicle.features) : [],
        } : null,
      } : null,
    }));

    return NextResponse.json(inspectionsWithArrays);
  } catch (error: any) {
    console.error('Erreur GET /api/inspections:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des inspections' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle inspection
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type,
      reservationId,
      vehicleId,
      photos,
      mileage,
      fuelLevel,
      damages,
      notes,
      signature,
      signedBy,
    } = body;

    const inspection = await prisma.inspection.create({
      data: {
        type,
        reservationId,
        vehicleId,
        photos: photos ? JSON.stringify(photos) : null,
        mileage: parseInt(mileage),
        fuelLevel: parseFloat(fuelLevel),
        damages,
        notes,
        signature,
        signedBy,
        signedAt: new Date(),
        validated: false,
      },
      include: {
        reservation: true,
        vehicle: true,
      },
    });

    // Parse JSON back to arrays for response
    const inspectionResponse = {
      ...inspection,
      photos: inspection.photos ? JSON.parse(inspection.photos as string) : [],
      vehicle: inspection.vehicle ? {
        ...inspection.vehicle,
        images: inspection.vehicle.images ? JSON.parse(inspection.vehicle.images as string) : [],
        features: inspection.vehicle.features ? JSON.parse(inspection.vehicle.features as string) : [],
      } : null,
    };

    return NextResponse.json(inspectionResponse, { status: 201 });
  } catch (error: any) {
    console.error('Erreur POST /api/inspections:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'inspection' },
      { status: 500 }
    );
  }
}
