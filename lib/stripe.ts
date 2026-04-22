import Stripe from 'stripe';

// Initialiser Stripe avec la clé secrète
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

// Fonction pour créer une pré-autorisation (hold) sur la carte
export async function createPaymentIntent(
  amount: number, // Montant en dollars (sera converti en cents)
  customerId?: string,
  metadata?: Record<string, string>
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir en cents
      currency: 'cad',
      capture_method: 'manual', // Important: ne pas capturer automatiquement
      customer: customerId,
      metadata: metadata || {},
      description: 'Caution pour location de véhicule',
    });

    return paymentIntent;
  } catch (error) {
    console.error('Erreur création payment intent:', error);
    throw error;
  }
}

// Fonction pour capturer un paiement pré-autorisé
export async function capturePayment(paymentIntentId: string, amountToCapture?: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId, {
      amount_to_capture: amountToCapture ? Math.round(amountToCapture * 100) : undefined,
    });

    return paymentIntent;
  } catch (error) {
    console.error('Erreur capture paiement:', error);
    throw error;
  }
}

// Fonction pour annuler une pré-autorisation
export async function cancelPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Erreur annulation payment intent:', error);
    throw error;
  }
}

// Fonction pour créer ou récupérer un client Stripe
export async function getOrCreateStripeCustomer(
  email: string,
  name?: string,
  phone?: string
) {
  try {
    // Chercher si le client existe déjà
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // Créer un nouveau client
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
    });

    return customer;
  } catch (error) {
    console.error('Erreur création/récupération client:', error);
    throw error;
  }
}

// Fonction pour créer un Setup Intent (pour enregistrer une carte sans payer)
export async function createSetupIntent(customerId: string) {
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
    });

    return setupIntent;
  } catch (error) {
    console.error('Erreur création setup intent:', error);
    throw error;
  }
}
