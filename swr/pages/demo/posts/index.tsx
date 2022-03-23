import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useSWR, { mutate } from "swr";
import axios from "axios";

import { Layout, Spinner } from "../../../components/common";
import { IPost } from "../../../types/app";
import Link from "next/link";

interface IProps {}

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const Posts: NextPage<IProps> = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm<IPost>({
    resolver: yupResolver(schema),
  });

  const { data: posts, error } = useSWR<IPost[]>(`/api/demo`);

  const onSubmit: SubmitHandler<IPost> = async (data) => {
    mutate(
      `/api/demo`,

      (existingPosts: IPost[]) => [
        ...existingPosts,
        {
          _id: Math.floor(Math.random() * 10000),
          title: data.title,
          description: data.description,
        },
      ],
      false
    );
    reset();
    await axios.post(`/api/demo`, {
      title: data.title,
      description: data.description,
    });
    mutate(`/api/demo`);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center space-y-2 mx-auto w-full max-w-md border rounded p-5">
          <label className="label">
            <span className="label-text mr-5">Title</span>
            <input
              {...register("title")}
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
              className="input-primary input-bordered w-full"
            />
            <p>{errors.description?.message}</p>
          </label>

          <input type="submit" className="btn btn-primary" />
        </div>

        <div className="text-center my-5">
          {!posts && <Spinner />}
          {posts &&
            posts.map((p) => (
              <div key={p._id} className="flex flex-col">
                <Link href={`/demo/posts/${p._id}?foo=bar&two=neat&three=nice`}>
                  <a className="cursor-pointer">{p.title}</a>
                </Link>
              </div>
            ))}
          {posts?.length === 0 && <p>No Post Found</p>}
          {error && <p>Fail to Load Posts</p>}
        </div>
      </form>
    </Layout>
  );
};

export default Posts;
