import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Error message: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('✅ Checkout session completed:', session.id);
      
      try {
        // Create a new donation record in Firestore
        await addDoc(collection(db, 'donations'), {
          stripeSessionId: session.id,
          amount: session.amount_total ? session.amount_total / 100 : 0, // amount_total is in cents
          currency: session.currency,
          customerEmail: session.customer_details?.email,
          status: session.payment_status,
          createdAt: serverTimestamp(),
        });
        console.log('📝 Donation record created in Firestore.');
      } catch (error) {
        console.error('🔥 Firestore error:', error);
        return NextResponse.json({ error: 'Failed to save donation record.' }, { status: 500 });
      }
      break;
    
    // ... handle other event types
    default:
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
