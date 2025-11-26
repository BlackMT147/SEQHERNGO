# SEQHER Digital Hub

This is a Next.js 14 website for SEQHER, an NGO aligned with the UN's Sustainable Development Goals (SDGs). The platform is built with Firebase (App Hosting, Firestore, Authentication) and Tailwind CSS.

## Core Features

- **Homepage**: An overview of the organization, its impact, and calls to action.
- **Programs**: A browsable list of SEQHER's programs with detailed views.
- **Donations**: Secure donation processing via Stripe Checkout.
- **Blog**: A content-rich blog with a full CMS for authorized administrators.
- **Appointment Booking**: An authenticated form for users to schedule appointments.
- **Admin Dashboard**: A protected area for managing site content like blog posts.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Firebase (Authentication, Firestore, App Hosting)
- **Payments**: Stripe
- **AI**: Google's Genkit for AI-powered features
- **Deployment**: Firebase App Hosting with GitHub Actions for CI/CD

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm, pnpm, or yarn
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project
- A Stripe account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd seqher-digital-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. Obtain the Firebase configuration from your Firebase project settings.

```
# Firebase Configuration
# Get these from your Firebase project settings > General
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Stripe Configuration
# Get these from your Stripe dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App URL
# The base URL of your deployed app (e.g., for Stripe redirects)
# For local development, this is typically http://localhost:9002
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

### 4. Set Up Firebase Emulators (Optional but Recommended)

Using Firebase Emulators for local development is highly recommended to avoid interfering with production data.

1.  **Initialize Emulators**:
    If you haven't already, run this command in your project root:
    ```bash
    firebase init emulators
    ```
    Select Authentication, Firestore, and Functions emulators. Use the default ports.

2.  **Start Emulators**:
    ```bash
    firebase emulators:start
    ```
    This will start the emulators and provide a UI for viewing data, typically at `http://localhost:4000`.

### 5. Seed Sample Data

To populate your local Firestore emulator with sample data (users, programs, blog posts), you can sign up a new user via the application's UI. The first user to sign up will automatically be granted admin privileges. You can then use the admin interface to add blog posts. Programs are currently mocked in the code but can be migrated to Firestore.

To create an initial admin user:
1. Start the app and emulators.
2. Navigate to `/login` and create a new account.
3. This first account will have the `role` field set to `admin` in your local Firestore emulator.

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Deployment

This project is configured for deployment to Firebase App Hosting. The CI/CD pipeline is managed via GitHub Actions, which will automatically deploy the `main` branch.

To deploy manually:

```bash
firebase deploy --only hosting
```
