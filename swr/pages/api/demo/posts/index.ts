import nc from "next-connect";
import type { NextApiResponse } from "next";

import { NextApiRequestExtended } from "../../../../types/app";
import {
  addPost,
  getPosts,
} from "../../../../server/controllers/demo-controllers";
import { dbMiddleware } from "../../../../server/middlewares/dbMiddleware";

const handler = nc<NextApiRequestExtended, NextApiResponse>().use(dbMiddleware);

handler.get(
  // authMiddleware,
  getPosts
);

handler.post(
  // authMiddleware,
  addPost
);

export default handler;
