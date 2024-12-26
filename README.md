# Valet-Wizard 🚗✨

**Valet-Wizard** is a service management system designed for valet parking services.

## Features

- **User Authentication**: Secure user registration and login using **NextAuth**, JWT tokens, and sessions.
- **Stripe Webhook Integration**: Handles real-time payments and events via Stripe, enabling smooth payment processing.
- **PostgreSQL Database**: Reliable and secure relational database for managing user data, parking orders, and payment statuses.
- **Admin Dashboard**: Manage and view all valet parking orders, payment statuses, and system settings.
- **Responsive UI**: A modern and mobile-friendly user interface built with **TailwindCSS** for a seamless experience on all devices.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **PostgreSQL**: A robust relational database used to store user data, orders, and payments.
- **JWT & Sessions**: Secure user authentication using JSON Web Tokens (JWT) and session management with **NextAuth**.
- **Stripe**: Integrated for processing online payments and handling Stripe webhooks to update payment statuses.
- **React, TypeScript, Tailwind CSS**
  
## Live Deployment

Check out the live version of **Valet-Wizard** here:  
[Valet-Wizard Deployment](https://valet-wizard.vercel.app/)

---

## Installation

### Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (v16 or higher) — [Download Node.js](https://nodejs.org/)
- **PostgreSQL** — [Install PostgreSQL](https://www.postgresql.org/download/)
- **Stripe Account** — [Create a Stripe account](https://stripe.com/)

### Set Up Your Local Development Environment

1. **Clone the repository**:

   ```bash
   git clone https://github.com/iyilmaz24/Valet-Wizard.git
   cd Valet-Wizard
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file at the root of the project and add the following environment variables:

   ```env
   NEXTAUTH_SECRET=<your-nextauth-secret>
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/valet_wizard
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
   ```

   Replace `<your-nextauth-secret>`, `<username>`, `<password>`, `<your-stripe-secret-key>`, and `<your-stripe-webhook-secret>` with your actual values.

4. **Run database migrations**:

   After setting up the environment variables, run the following command to migrate the database schema:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:

   Run the following command to start the application locally:

   ```bash
   npm run dev
   ```

6. **Access the app**:

   Once the server is running, open your browser and visit `http://localhost:3000` to view the app.

---

## Usage

### Authentication

- Users can register and log in using **NextAuth**, which handles the session and JWT tokens for authentication.

### Parking Orders

- Users can view and manage parking orders via a simple dashboard.
- Users can place new parking orders, and the status of each order is tracked in the system.

### Payment Processing

- Payments are securely processed through **Stripe**.
- Webhook events from Stripe are handled by the system to ensure real-time updates to payment statuses.

---

## Stripe Webhook Integration

To integrate **Stripe** for payment processing, follow these steps:

1. Go to the [Stripe Dashboard](https://dashboard.stripe.com/) and create a test API key and webhook secret.
2. In your Stripe dashboard, set up a webhook endpoint to listen to events at your app's `/api/stripe/webhook` endpoint.
3. In your `.env.local`, add the following:

   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. When a payment is made, Stripe will send a webhook event to your app. The application will process this event and update the payment status accordingly.

---

## Database Setup

### PostgreSQL Database

1. **Create the PostgreSQL database**:

   If you haven’t already, create a new database in your PostgreSQL server:

   ```bash
   CREATE DATABASE valet_wizard;
   ```

2. **Database Schema**:

   The database schema is managed with **Prisma ORM**. After cloning the repository, run the following command to set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

   This will apply the schema migrations and set up tables for managing users, orders, and payments.

---

## Development

### Running the Application Locally

1. Start the development server:

   ```bash
   npm run dev
   ```

2. The app will be running at `http://localhost:3000`.

3. Access the admin dashboard or create orders directly from the user interface.

### Testing

Ensure that all the relevant API endpoints (e.g., authentication, payments, webhooks) are thoroughly tested. You can use tools like **Postman** or **Insomnia** for API testing and validation.

### Running Prisma Migrations

To update the database schema when you make changes, run:

```bash
npx prisma migrate dev
```

---

## Additional Notes

- **Security**: Be sure to use strong, unique values for your **JWT secret**, **Stripe secret key**, and **Stripe webhook secret** to ensure security.
- **Stripe Testing**: During development, make sure to test payments using Stripe’s testing environment before going live.
- **PostgreSQL**: Ensure your PostgreSQL server is running and accessible on the correct port before trying to connect.


