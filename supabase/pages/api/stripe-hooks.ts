import { supabase } from "./../../utils/client";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { getServiceSupabase } from "../../utils/client";

export const config = { api: { bodyParser: false } };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Instantiate Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2020-08-27",
  });
  const signature = req.headers["stripe-signature"] as string;
  const signingSecret = process.env.STRIPE_SIGNING_SECRET as string;
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${(error as any).message}`);
  }

  const supabase = getServiceSupabase();

  switch (event.type) {
    case "customer.subscription.created":
      await supabase
        .from("profile")
        .update({
          is_subscribed: true,
          interval: (event.data.object as any).items.data[0].plan.interval,
        })
        .eq("stripe_customer", (event.data.object as any).customer);
  }

  console.log("event", event);
  res.send({ received: true });
};

export default handler;
