import { NextPage } from "next";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import { Layout, Spinner } from "../../../components/common";
import { IPost } from "../../../types/app";
import { capitalizeFirstLetter } from "../../../utils/capitalize_first_letter";
import { usePagination } from "../../../utils/usePagination";

interface IProps {}

interface IPostsData {
  postsCount: number;
  posts: IPost[];
}

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

//https://blog.logrocket.com/handling-data-fetching-next-js-useswr/

//! Pagination
// https://www.udemy.com/course/graphql-apollo-server-api-nodejs-mongodb/learn/lecture/16355642#overview
// https://youtu.be/1KTK6JplLLw
// https://swr.vercel.app/docs/pagination
// https://youtu.be/U3a2qp2DF7I

//! Text Search & Pagination & Sorting
// https://youtu.be/1TZObMg4A7s
// https://adamrichardson.dev/code/prefetch-and-pagination-graphql-nextjs

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

  const [searchText, setSearchText] = useState<string>("ggg");

  const {
    paginatedData: paginatedPosts,
    error,
    isLoadingMore,
    isReachedEnd,
    setPage,
    page,
    mutate: mutatePosts,
  } = usePagination<IPost>(`/api/demo/posts`, searchText);

  const onSubmit: SubmitHandler<IPost> = async (data) => {
    try {
      // ! Using Optimistic UI when not using Pagination
      // mutatePost(
      //   (existingPosts: any) => [
      //     [
      //       {
      //         _id: uuidv4(),
      //         title: capitalizeFirstLetter(data.title),
      //         description: capitalizeFirstLetter(data.description),
      //         clientOnly: true,
      //       },
      //     ],
      //     ...existingPosts,
      //   ],
      //   false
      // );
      reset();
      await axios.post(`/api/demo/posts`, {
        title: data.title,
        description: data.description,
      });
      mutatePosts();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (postId: string) => {
    await axios.delete(`/api/demo/posts/${postId}`);
    mutatePosts();
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
      </form>

      <div className="m-5 space-x-5 flex justify-center">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-48 md:w-1/2"
          // onChange={(e) => {
          //   setSearchText(e.target.value);
          // }}
        />
      </div>

      <div className="text-center my-5">
        {!paginatedPosts && !error && <Spinner />}
        {paginatedPosts &&
          paginatedPosts.map((p) => (
            <div
              key={p._id}
              className="flex flex-row justify-center items-center my-3"
            >
              <div>
                <Link href={`/demo/posts/${p._id}?foo=bar&two=neat&three=nice`}>
                  <a
                    className={`cursor-pointer mr-10 ${
                      p.clientOnly && "text-green-500"
                    }`}
                  >
                    {p.title}
                  </a>
                </Link>
              </div>
              <div>
                <button
                  onClick={() => onDelete(p._id as string)}
                  className="btn btn-circle btn-sm btn-outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        {/* {paginatedPosts?.length === 0 ? <p>No Post Found</p> : null} */}
        {error && <p>Fail to Load Posts</p>}
        {isLoadingMore && <Spinner />}

        <button
          disabled={isReachedEnd}
          onClick={() => setPage(page + 1)}
          className="btn btn-info btn-sm my-5 cursor-pointer"
        >
          Load More
        </button>

        {/* <div className="btn-group w-max mx-auto my-5">

          <button
            disabled={pageIndex <= 1}
            onClick={() => setPageIndex(pageIndex - 1)}
            className="btn"
          >
            «
          </button>
          <button className="btn">Page {pageIndex}</button>
          <button
            // disabled={pageIndex > 0}
            onClick={() => {
              setPageIndex(pageIndex + 1);
            }}
            className="btn"
          >
            »
          </button>
        </div> */}
      </div>
    </Layout>
  );
};

export default Posts;
