'use server';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function createCheckoutSession(amount: number) {
  const origin = headers().get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
  
  if (!amount || amount < 5) {
      throw new Error("Invalid donation amount.");
  }
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to SEQHER',
              images: ['https://picsum.photos/seed/11/200/200'], // Placeholder for logo
            },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate`,
    });

    if (!session.url) {
        throw new Error("Could not create Stripe session URL.");
    }
    
    return { url: session.url };
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    throw new Error("Failed to create Stripe checkout session.");
  }
}
