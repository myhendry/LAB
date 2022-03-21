import { NextApiResponse } from "next";

import { NextApiRequestExtended } from "../../types/app";
import clientPromise from "../lib/mongodb";

export const dbMiddleware = async (
  req: NextApiRequestExtended,
  _res: NextApiResponse,
  next: any
) => {
  const client = await clientPromise;
  const db = await client.db();
  req.db = db;
  next();
};
