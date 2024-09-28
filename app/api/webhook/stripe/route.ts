import stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;
  console.log("🚀 ~ POST ~ eventType:", eventType)

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    console.log("🚀 ~ POST ~ metadata:", metadata)
    console.log("🚀 ~ POST ~ amount_total:", amount_total)
    console.log("🚀 ~ POST ~ id:", id)

    

    return NextResponse.json({ message: "OK",});
  }

  return new Response("", { status: 200 });
}
