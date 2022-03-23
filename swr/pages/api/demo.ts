import nc from "next-connect";
import type { NextApiResponse } from "next";

import { NextApiRequestExtended } from "../../types/app";
import { addHello, getHellos } from "../../server/controllers/demo-controllers";
import { dbMiddleware } from "../../server/middlewares/dbMiddleware";

const handler = nc<NextApiRequestExtended, NextApiResponse>().use(dbMiddleware);

handler.get(
  // authMiddleware,
  getHellos
);

handler.post(
  // authMiddleware,
  addHello
);

export default handler;
