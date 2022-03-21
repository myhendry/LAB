import { NextApiRequest, NextApiResponse } from "next";

//! Purpose of this middleware is to save on the use of try catch blocks and put them into a middleware instead
export const catchAsyncErrors =
  (func: any) => (req: NextApiRequest, res: NextApiResponse, next: any) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };

//! Invalid MongoID Error -> return null, will not go into catch block
//! Input Type Error -> go into catch block, Error: Room validation failed
//! MongoDB ID Malform -> go into catch block, Error: Cast to ObjectId error
