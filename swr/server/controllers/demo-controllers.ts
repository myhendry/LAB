import { ObjectId } from "mongodb";
import { NextApiResponse } from "next";

import { IComment, IPost, NextApiRequestExtended } from "../../types/app";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export const getPosts = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const posts = await req.db?.collection("posts").find().toArray();
    res.status(200).json(posts);
  }
);

export const getPost = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const post = await req.db?.collection("posts").findOne({
      _id: new ObjectId(req.query.id as string),
    });
    res.status(200).json(post);
  }
);

export const addPost = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const body: IPost = req.body;

    const result = await req.db?.collection("posts").insertOne({
      title: body.title,
      description: body.description,
    });
    res.status(200).send(result);
  }
);

export const updatePost = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const postId = req.query.id;
    const body: IPost = req.body;

    await req.db?.collection("posts").findOneAndUpdate(
      {
        _id: new ObjectId(postId as string),
      },
      {
        $set: {
          title: body.title,
          description: body.description,
        },
      }
    );
    res.status(200).send({
      updated: true,
    });
  }
);

export const deletePost = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const postId = req.query.id;

    await req.db?.collection("posts").findOneAndDelete({
      _id: new ObjectId(postId as string),
    });
    res.status(200).send({
      deleted: true,
    });
  }
);

export const getCommentsByPostId = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const comments = await req.db
      ?.collection("comments")
      .find({
        postId: req.query.id,
      })
      .toArray();
    res.status(200).json(comments);
  }
);

export const addCommentWithPostId = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const postId = req.query.id;
    const body: IComment = req.body;

    const result = await req.db?.collection("comments").insertOne({
      comment: body.comment,
      postId,
    });
    res.status(200).send(result);
  }
);
