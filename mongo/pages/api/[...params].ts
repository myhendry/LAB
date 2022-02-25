import nc from "next-connect";
import type { WithId, Document, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc({}).get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const params = req.query.params;
    console.log("params", params);

    res.status(201).send({
      title: "Hello World",
    });
  }
);

export default handler;
