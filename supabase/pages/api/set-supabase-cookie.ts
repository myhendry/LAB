import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import { supabase } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await supabase.auth.api.setAuthCookie(req, res);
}
