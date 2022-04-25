import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import { supabase } from "../../utils/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
