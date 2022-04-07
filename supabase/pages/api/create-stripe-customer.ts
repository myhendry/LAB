import { NextApiResponse, NextApiRequest } from "next";
import Stripe from "stripe";

import { supabase } from "../../utils/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  }

  /* 
   Upon User Created in Supabase during Auth,
   a Profile Table populated with id and email will be Created Too
   Using Supabase Functions and Triggers
  */

  // Instantiate Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2020-08-27",
  });

  // Create Customer Record in Stripe
  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  // Upsert into Supabase's Profile Table
  await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", req.body.record.id);

  // Profile ->
  res.send({ message: `stripe customer created: ${customer.id}` });
};

export default handler;
