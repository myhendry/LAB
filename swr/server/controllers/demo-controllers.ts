import { NextApiResponse } from "next";

import { IPost, NextApiRequestExtended } from "../../types/app";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export const getHellos = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const hellos = await req.db?.collection("hello").find().toArray();
    res.status(200).json(hellos);
  }
);

export const addHello = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    console.log(req.body);
    const body: IPost = req.body;

    const result = await req.db?.collection("hello").insertOne({
      title: body.title,
      description: body.description,
    });
    res.status(200).send(result);
  }
);
