import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Récupérer une réservation par ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        vehicle: true,
        inspections: true,
        invoices: true,
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: 'Réservation non trouvée' },
        { status: 404 }
      );
    }

    // Parse JSON strings back to arrays
    const reservationResponse = {
      ...reservation,
      vehicle: reservation.vehicle ? {
        ...reservation.vehicle,
        images: reservation.vehicle.images ? JSON.parse(reservation.vehicle.images as string) : [],
        features: reservation.vehicle.features ? JSON.parse(reservation.vehicle.features as string) : [],
      } : null,
      inspections: reservation.inspections ? reservation.inspections.map((insp: any) => ({
        ...insp,
        photos: insp.photos ? JSON.parse(insp.photos) : [],
      })) : [],
    };

    return NextResponse.json(reservationResponse);
  } catch (error: any) {
    console.error('Erreur GET /api/reservations/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la réservation' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une réservation
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      status,
      depositReturned,
      notes,
      startDate,
      endDate,
      totalPrice,
    } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (typeof depositReturned === 'boolean') updateData.depositReturned = depositReturned;
    if (notes !== undefined) updateData.notes = notes;
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);
    if (totalPrice) updateData.totalPrice = parseFloat(totalPrice);

    const reservation = await prisma.reservation.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        vehicle: true,
      },
    });

    // Si annulée, remettre le véhicule disponible
    if (status === 'CANCELLED') {
      await prisma.vehicle.update({
        where: { id: reservation.vehicleId },
        data: { status: 'AVAILABLE' },
      });
    }

    // Si confirmée, mettre véhicule en réservé
    if (status === 'CONFIRMED') {
      await prisma.vehicle.update({
        where: { id: reservation.vehicleId },
        data: { status: 'RESERVED' },
      });
    }

    // Si active, mettre véhicule en location
    if (status === 'ACTIVE') {
      await prisma.vehicle.update({
        where: { id: reservation.vehicleId },
        data: { status: 'RENTED' },
      });
    }

    // Si complétée, remettre véhicule disponible
    if (status === 'COMPLETED') {
      await prisma.vehicle.update({
        where: { id: reservation.vehicleId },
        data: { status: 'AVAILABLE' },
      });
    }

    // Parse JSON back to arrays for response
    const reservationResponse = {
      ...reservation,
      vehicle: reservation.vehicle ? {
        ...reservation.vehicle,
        images: reservation.vehicle.images ? JSON.parse(reservation.vehicle.images as string) : [],
        features: reservation.vehicle.features ? JSON.parse(reservation.vehicle.features as string) : [],
      } : null,
    };

    return NextResponse.json(reservationResponse);
  } catch (error: any) {
    console.error('Erreur PUT /api/reservations/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la réservation' },
      { status: 500 }
    );
  }
}

// DELETE - Annuler une réservation
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: 'Réservation non trouvée' },
        { status: 404 }
      );
    }

    // Mettre le statut à CANCELLED au lieu de supprimer
    await prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    // Remettre le véhicule disponible
    await prisma.vehicle.update({
      where: { id: reservation.vehicleId },
      data: { status: 'AVAILABLE' },
    });

    return NextResponse.json({ message: 'Réservation annulée avec succès' });
  } catch (error: any) {
    console.error('Erreur DELETE /api/reservations/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'annulation de la réservation' },
      { status: 500 }
    );
  }
}
