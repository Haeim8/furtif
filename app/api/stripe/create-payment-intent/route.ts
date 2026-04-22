import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, customerId, metadata } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Montant invalide' },
        { status: 400 }
      );
    }

    // Créer le Payment Intent avec capture manuelle (pré-autorisation)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir en cents
      currency: 'cad',
      capture_method: 'manual', // Pré-autorisation seulement
      customer: customerId,
      metadata: metadata || {},
      description: 'Caution pour location de véhicule - Montreal Car Rental',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Erreur API create-payment-intent:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
