import { NextApiRequest, NextApiResponse } from "next";

import Article from "../models/article";

const getAllArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const articles = await Article.find({});
    return res.status(200).send(articles);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
    });
  }
};

const getArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const articleId = req.query.articleId;
    const article = await Article.findById(articleId);
    return res.status(200).send(article);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
    });
  }
};

const newArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  let { rating, ...data } = req.body;
  if (!Number.isInteger(rating)) {
    rating = 0;
  }
  try {
    const article = await Article.create({ ...data, rating });
    return res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
    });
  }
};

export { getAllArticles, getArticle, newArticle };
