import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentIntentId, amountToCapture } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment Intent ID manquant' },
        { status: 400 }
      );
    }

    // Capturer le paiement
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId, {
      amount_to_capture: amountToCapture ? Math.round(amountToCapture * 100) : undefined,
    });

    return NextResponse.json({
      success: true,
      paymentIntent,
    });
  } catch (error: any) {
    console.error('Erreur API capture-payment:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
