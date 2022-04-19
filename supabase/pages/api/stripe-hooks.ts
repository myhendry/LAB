import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

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

  console.log("event", event);
  res.send({ received: true });
};

export default handler;
