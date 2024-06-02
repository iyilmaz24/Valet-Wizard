import prisma from "@/lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const data = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      data,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Webhook verification failed", error);
    return Response.json(null, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await prisma.user.update({
          where: {
            email: event.data.object.customer_email,
          },
          data: {
            subscriptionActive: true,
          },
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.log("Error updating user subscription status", error);
    return Response.json(null, { status: 500 });
  }

  return Response.json(null, { status: 200 });
}
