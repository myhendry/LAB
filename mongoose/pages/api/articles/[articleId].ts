import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { getArticle } from "../../../controllers/articles";
import dbConnect from "../../../lib/dbConnect";

const handler = nc<NextApiRequest, NextApiResponse>();

dbConnect();

handler.get(getArticle);

export default handler;
