'use server';

// Stripe integration removed. Keep a clear stub so callers fail loudly
// instead of silently attempting to use a missing service.
export async function createCheckoutSession(amount: number) {
  throw new Error('Stripe integration has been removed from this project.');
}
