import nc from "next-connect";
import type { NextApiResponse } from "next";

import { NextApiRequestExtended } from "../../../../../../types/app";
import {
  getCommentsByPostId,
  addCommentWithPostId,
} from "../../../../../../server/controllers/demo-controllers";
import { dbMiddleware } from "../../../../../../server/middlewares/dbMiddleware";

const handler = nc<NextApiRequestExtended, NextApiResponse>().use(dbMiddleware);

handler.get(
  // authMiddleware,
  getCommentsByPostId
);

handler.post(
  // authMiddleware,
  addCommentWithPostId
);

export default handler;
