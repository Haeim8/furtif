import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Récupérer une inspection par ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const inspection = await prisma.inspection.findUnique({
      where: { id },
      include: {
        reservation: {
          include: {
            user: true,
            vehicle: true,
          },
        },
        vehicle: true,
      },
    });

    if (!inspection) {
      return NextResponse.json(
        { error: 'Inspection non trouvée' },
        { status: 404 }
      );
    }

    // Parse JSON strings back to arrays
    const inspectionResponse = {
      ...inspection,
      photos: inspection.photos ? JSON.parse(inspection.photos as string) : [],
      vehicle: inspection.vehicle ? {
        ...inspection.vehicle,
        images: inspection.vehicle.images ? JSON.parse(inspection.vehicle.images as string) : [],
        features: inspection.vehicle.features ? JSON.parse(inspection.vehicle.features as string) : [],
      } : null,
      reservation: inspection.reservation ? {
        ...inspection.reservation,
        vehicle: inspection.reservation.vehicle ? {
          ...inspection.reservation.vehicle,
          images: inspection.reservation.vehicle.images ? JSON.parse(inspection.reservation.vehicle.images as string) : [],
          features: inspection.reservation.vehicle.features ? JSON.parse(inspection.reservation.vehicle.features as string) : [],
        } : null,
      } : null,
    };

    return NextResponse.json(inspectionResponse);
  } catch (error: any) {
    console.error('Erreur GET /api/inspections/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'inspection' },
      { status: 500 }
    );
  }
}

// PUT - Valider/Mettre à jour une inspection
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { validated, validatedBy } = body;

    // Récupérer l'inspection avec les relations
    const existingInspection = await prisma.inspection.findUnique({
      where: { id },
      include: {
        vehicle: true,
        reservation: true,
      },
    });

    if (!existingInspection) {
      return NextResponse.json(
        { error: 'Inspection non trouvée' },
        { status: 404 }
      );
    }

    const inspection = await prisma.inspection.update({
      where: { id },
      data: {
        validated: validated === true,
        validatedBy,
        validatedAt: validated === true ? new Date() : null,
      },
    });

    // RÈGLE CRITIQUE: Si inspection de RETOUR est validée, débloquer le véhicule
    if (validated === true && existingInspection.type === 'RETURN') {
      await prisma.vehicle.update({
        where: { id: existingInspection.vehicleId },
        data: { status: 'AVAILABLE' },
      });

      // Marquer la réservation comme complétée
      if (existingInspection.reservationId) {
        await prisma.reservation.update({
          where: { id: existingInspection.reservationId },
          data: { status: 'COMPLETED' },
        });
      }
    }

    return NextResponse.json(inspection);
  } catch (error: any) {
    console.error('Erreur PUT /api/inspections/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la validation de l\'inspection' },
      { status: 500 }
    );
  }
}
