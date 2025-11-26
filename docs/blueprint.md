# **App Name**: SEQHER Digital Hub

## Core Features:

- Homepage: Landing page with organization overview, impact highlights, and calls to action.
- Programs Listing/Detail: Display SEQHER's programs in a browsable format with detailed views for each program.
- Donation Page: Integrated Stripe Checkout for secure donation processing. All fields required for the checkout page (billing and shipping details are not needed).
- Blog with CMS: Content Management System for creating and managing blog posts. Role-based access using Firebase Auth and Firestore rules to ensure CMS access is limited to authorized users.
- Authenticated Booking Form: Form for scheduling appointments, secured behind Firebase Authentication. Uses role-based access with Firestore rules. A tool which uses an LLM will decide if the supplied email address is legitimate based on historical records.
- Stripe Webhook Processing: Serverless Firebase Function to handle Stripe webhooks, verifying donation events and creating corresponding donation records in Firestore.
- GitHub Actions CI/CD: Automated deployment to Firebase Hosting and Lighthouse CI checks with GitHub Actions for continuous integration and delivery.

## Style Guidelines:

- Primary color: Earthy green (#7B9F8A) to reflect growth, sustainability, and SDG alignment.
- Background color: Very light off-white (#F2F3F0), a desaturated version of the primary color for a clean and calming effect.
- Accent color: Warm gold (#C9B037), an analogous color to the primary to evoke a sense of value and prosperity.
- Body and headline font: 'PT Sans', a humanist sans-serif for readability and a modern feel.
- Use clean, consistent icons from a set like FontAwesome or Material Icons, with a focus on icons related to SDG goals.
- Responsive design using Tailwind CSS for optimal viewing on all devices.
- Subtle transitions and animations to enhance user experience without being distracting.