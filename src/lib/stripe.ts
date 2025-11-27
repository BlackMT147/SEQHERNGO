// Stripe was removed from this project. Export a small runtime stub so any
// accidental import won't crash the build. This file intentionally avoids
// importing the official `stripe` package to keep the dependency out.
export const stripe = {
  checkout: {
    sessions: {
      // Calling create will throw to indicate payments are not configured.
      create: async () => {
        throw new Error('Stripe integration removed; checkout is not available.');
      },
    },
  },
  webhooks: {
    constructEvent: () => {
      throw new Error('Stripe webhooks not configured.');
    },
  },
} as any;
