import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentIntentId } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment Intent ID manquant' },
        { status: 400 }
      );
    }

    // Annuler la pré-autorisation
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    return NextResponse.json({
      success: true,
      paymentIntent,
    });
  } catch (error: any) {
    console.error('Erreur API cancel-payment:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
