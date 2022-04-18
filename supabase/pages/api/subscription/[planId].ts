import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import cookie from "cookie";

import { supabase } from "../../../utils/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const token = cookie.parse(req.headers.cookie as string)["sb-access-token"];

  //@ts-ignore
  supabase.auth.session = () => ({
    access_token: token,
  });

  const {
    data: { stripe_customer },
  } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  res.send({
    ...user,
    stripe_customer,
  });
};

export default handler;
