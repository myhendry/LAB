// pages/api/hello.js
import nc from "next-connect";
import type { WithId, Document, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../../lib/mongodb";

interface Book extends WithId<Document> {
  _id: ObjectId;
  name: string;
}

const handler = nc({}).get(
  async (req: NextApiRequest, res: NextApiResponse<Book[]>) => {
    const client = await clientPromise;
    const db = await client.db();
    const books = (await db.collection("samples").find({}).toArray()) as Book[];
    res.status(201).send(books);
  }
);

export default handler;
