import { NextApiResponse } from "next";

import { NextApiRequestExtended } from "./../../types/app.d";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export const getHellos = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const hellos = await req.db?.collection("hello").find().toArray();
    res.status(200).json(hellos);
  }
);

export const addHello = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const result = await req.db?.collection("hello").insertOne({
      title: "yesss",
      description: "hiiii",
    });
    res.status(200).send(result);
  }
);
