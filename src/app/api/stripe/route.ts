import prisma from "@/lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const data = await request.json();
  const signature = request.headers.get("Stripe-Signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      data,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Webhook verification failed.");
    return Response.json(null, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: {
          email: data.data.object.customer_email,
        },
        data: {
          subscriptionActive: true,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json(null, { status: 200 });
}
