import { NextApiRequest } from "next";
import { Db } from "mongodb";

export interface IPost {
  _id?: string;
  title: string;
  description: string;
  comments: IComment[];
}

export interface IComment {
  _id?: string;
  comment: string;
}

export interface NextApiRequestExtended extends NextApiRequest {
  uid?: string | null;
  db?: Db;
}

export interface IListing {
  sys: {
    id: string;
  };
  fields: {
    images: IImage[];
    property: string;
    slug: string;
  };
}

export interface IImage {
  fields: {
    file: {
      url: string;
    };
  };
  sys: {
    id: string;
  };
}
