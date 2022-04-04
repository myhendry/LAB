import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import { supabase } from "../../utils/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
