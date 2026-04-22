import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Liste toutes les réservations
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const vehicleId = searchParams.get('vehicleId');

    const where: any = {};
    if (status) where.status = status;
    if (vehicleId) where.vehicleId = vehicleId;
    if (startDate && endDate) {
      where.startDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const reservations = await prisma.reservation.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            driverLicense: true,
            iban: true,
          },
        },
        vehicle: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Parse JSON strings back to arrays for vehicles
    const reservationsWithArrays = reservations.map((res: any) => ({
      ...res,
      vehicle: res.vehicle ? {
        ...res.vehicle,
        images: res.vehicle.images ? JSON.parse(res.vehicle.images) : [],
        features: res.vehicle.features ? JSON.parse(res.vehicle.features) : [],
      } : null,
    }));

    return NextResponse.json(reservationsWithArrays);
  } catch (error: any) {
    console.error('Erreur GET /api/reservations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des réservations' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle réservation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      vehicleId,
      startDate,
      endDate,
      totalPrice,
      depositPaid,
      stripePaymentId,
      stripeDepositId,
      manualBooking,
      notes,
    } = body;

    // Si userId temporaire, créer un utilisateur guest
    let finalUserId = userId;
    if (userId && userId.startsWith('temp-user-')) {
      const tempUser = await prisma.user.create({
        data: {
          email: `guest-${Date.now()}@temp.com`,
          name: 'Client Invité',
          role: 'CLIENT',
        },
      });
      finalUserId = tempUser.id;
    }

    // Vérifier que le véhicule existe et est disponible
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Véhicule non trouvé' },
        { status: 404 }
      );
    }

    // RÈGLE CRITIQUE: Le véhicule doit être AVAILABLE
    // Si RENTED = encore en location, ne redevient AVAILABLE qu'après inspection retour validée
    if (vehicle.status !== 'AVAILABLE') {
      return NextResponse.json(
        { error: `Ce véhicule n'est pas disponible (statut: ${vehicle.status})` },
        { status: 400 }
      );
    }

    // Vérifier disponibilité des dates (chevauchement)
    const existingReservations = await prisma.reservation.findMany({
      where: {
        vehicleId,
        status: {
          in: ['CONFIRMED', 'ACTIVE'],
        },
        OR: [
          {
            startDate: {
              lte: new Date(endDate),
            },
            endDate: {
              gte: new Date(startDate),
            },
          },
        ],
      },
    });

    if (existingReservations.length > 0) {
      return NextResponse.json(
        { error: 'Le véhicule n\'est pas disponible pour ces dates' },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: finalUserId,
        vehicleId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: parseFloat(totalPrice),
        depositPaid: parseFloat(depositPaid),
        stripePaymentId,
        stripeDepositId,
        manualBooking: manualBooking || false,
        notes,
        status: 'PENDING',
      },
      include: {
        user: true,
        vehicle: true,
      },
    });

    // Mettre à jour le statut du véhicule
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { status: 'RESERVED' },
    });

    // Parse JSON back to arrays for response
    const reservationResponse = {
      ...reservation,
      vehicle: reservation.vehicle ? {
        ...reservation.vehicle,
        images: reservation.vehicle.images ? JSON.parse(reservation.vehicle.images as string) : [],
        features: reservation.vehicle.features ? JSON.parse(reservation.vehicle.features as string) : [],
      } : null,
    };

    return NextResponse.json(reservationResponse, { status: 201 });
  } catch (error: any) {
    console.error('Erreur POST /api/reservations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réservation' },
      { status: 500 }
    );
  }
}
