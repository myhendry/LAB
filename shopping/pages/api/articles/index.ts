import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { getAllArticles, newArticle } from "../../../controllers/articles";
import dbConnect from "../../../lib/dbConnect";

const handler = nc<NextApiRequest, NextApiResponse>();

dbConnect();

handler.get(getAllArticles);
handler.post(newArticle);

export default handler;
