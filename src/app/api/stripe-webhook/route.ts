import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!webhookSecret) {
  console.error('Missing STRIPE_WEBHOOK_SECRET environment variable. Webhooks will not be validated.');
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  // In Next.js 15 the `headers()` helper may be async/Promise-typed in this
  // environment; await it to satisfy the type system and runtime.
  const hdrs = await headers();
  const signature = hdrs.get('stripe-signature');

  if (!signature) {
    console.warn('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature header' }, { status: 400 });
  }

  if (!webhookSecret) {
    console.error('Stripe webhook secret not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err?.message ?? err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', session.id);

        if (!session.id) {
          console.warn('Received checkout.session.completed without session id');
          return NextResponse.json({ error: 'Missing session id' }, { status: 400 });
        }

        // Idempotency: use session id as document id to avoid duplicates
        if (!db) {
          console.error('Firestore not configured - cannot persist donation');
          break;
        }

        const docRef = doc(db, 'donations', session.id);
        await setDoc(docRef, {
          stripeSessionId: session.id,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency,
          customerEmail: session.customer_details?.email,
          status: session.payment_status,
          createdAt: serverTimestamp(),
        });

        console.log('Donation record created/updated in Firestore.');
        break;
      }

      default:
        console.warn('Unhandled event type:', event.type);
    }
  } catch (err) {
    console.error('Error handling webhook event:', err);
    return NextResponse.json({ error: 'Failed to handle event' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
