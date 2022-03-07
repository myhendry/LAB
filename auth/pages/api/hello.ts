// pages/api/hello.js
import nc from "next-connect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  message: string;
};

const handler = nc({}).get(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).send({
        message: "Unauthenticated User",
      });
    }

    res.status(201).send({
      message: "Hello",
    });
  }
);

export default handler;
