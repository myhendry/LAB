import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { KeyedMutator } from "swr";
import { v4 as uuidv4 } from "uuid";

import { IPost } from "../../types/app";

type Props = {
  post?: IPost;
  mutatePost: KeyedMutator<IPost>;
};

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export const PostForm = ({ post, mutatePost }: Props) => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<IPost>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IPost> = async (data) => {
    await axios.put(`/api/demo/posts/${post?._id}`, data);
    mutatePost();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center space-y-2 mx-auto w-full max-w-md border rounded p-5">
        <label className="label">
          <span className="label-text mr-5">Title</span>
          <input
            {...register("title")}
            defaultValue={post?.title}
            type="text"
            className="input-primary input-bordered w-full"
          />
          <p>{errors.title?.message}</p>
        </label>
        <label className="label">
          <span className="label-text mr-5">Description</span>
          <input
            {...register("description")}
            type="description"
            defaultValue={post?.description}
            className="input-primary input-bordered w-full"
          />
          <p>{errors.description?.message}</p>
        </label>

        <button className="btn btn-secondary">Update Post</button>
      </div>
    </form>
  );
};
