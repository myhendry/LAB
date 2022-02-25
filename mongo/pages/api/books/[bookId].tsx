// pages/api/hello.js
import nc from "next-connect";
import { ObjectId, WithId, Document } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../../lib/mongodb";

interface Book extends WithId<Document> {
  _id: ObjectId;
  name: string;
}
const handler = nc({}).get(
  async (req: NextApiRequest, res: NextApiResponse<Book>) => {
    const bookId = req.query.bookId;

    const client = await clientPromise;
    const db = await client.db();

    const book = (await db
      .collection("samples")
      .findOne({ _id: new ObjectId(bookId as string) })) as Book;

    res.status(201).send(book);
  }
);

export default handler;
