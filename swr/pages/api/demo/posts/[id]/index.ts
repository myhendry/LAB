import nc from "next-connect";
import type { NextApiResponse } from "next";

import { NextApiRequestExtended } from "../../../../../types/app";
import {
  deletePost,
  getPost,
  updatePost,
} from "../../../../../server/controllers/demo-controllers";
import { dbMiddleware } from "../../../../../server/middlewares/dbMiddleware";

const handler = nc<NextApiRequestExtended, NextApiResponse>().use(dbMiddleware);

handler.get(
  // authMiddleware,
  getPost
);
handler.put(
  // authMiddleware,
  updatePost
);

handler.delete(deletePost);

export default handler;
