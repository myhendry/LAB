import { ObjectId } from "mongodb";
import { NextApiResponse } from "next";

import { IComment, IPost, NextApiRequestExtended } from "../../types/app";
import { capitalizeFirstLetter } from "../../utils/capitalize_first_letter";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

// https://github.com/hoangvvo/nextjs-mongodb-app
// https://www.tutorialspoint.com/mongodb/mongodb_limit_record.htm

export const getPosts = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { db } = req;

    const currentPage = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.limit as string) || 2;
    const searchText = req.query.searchText;

    // console.log(searchText);

    const skip = pageSize * (currentPage - 1);
    const limit = pageSize;

    const posts = await db
      ?.collection("posts")
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(posts);
    // res.status(200).json({
    //   postsCount: posts?.length,
    //   posts: posts,
    // });
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
      title: capitalizeFirstLetter(body.title),
      description: capitalizeFirstLetter(body.description),
      createdAt: new Date(),
      updatedAt: new Date(),
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
          title: capitalizeFirstLetter(body.title),
          description: capitalizeFirstLetter(body.description),
          updatedAt: new Date(),
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

    const deletePostPromise = req.db?.collection("posts").findOneAndDelete({
      _id: new ObjectId(postId as string),
    });

    const deleteCommentsPromise = req.db?.collection("comments").deleteMany({
      postId,
    });

    await Promise.all([deletePostPromise, deleteCommentsPromise]);

    res.status(200).send({
      deleted: true,
    });
  }
);

export const getCommentsByPostId = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { db } = req;

    const currentPage = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.limit as string) || 2;

    const skip = pageSize * (currentPage - 1);
    const limit = pageSize;

    const comments = await db
      ?.collection("comments")
      .find({
        postId: req.query.id,
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(comments);
  }
);

export const addCommentWithPostId = catchAsyncErrors(
  async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const postId = req.query.id;
    const body: IComment = req.body;

    const result = await req.db?.collection("comments").insertOne({
      comment: capitalizeFirstLetter(body.comment),
      postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).send(result);
  }
);
