'use server';

// No-op server actions for donations: Stripe has been removed and this
// project prefers an in-app pledge flow. If you need server-side
// processing later, implement a server action here (do NOT add secrets
// to client bundle).
export async function createCheckoutSession() {
  throw new Error('No server-side donation processing is configured.');
}
