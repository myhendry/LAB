import { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../utils/client";

export default (req: NextApiRequest, res: NextApiResponse) => {
  supabase.auth.api.setAuthCookie(req, res);
};
