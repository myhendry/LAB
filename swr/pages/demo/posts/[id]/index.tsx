import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

import { Layout, Spinner } from "../../../../components/common";
import { IComment, IPost } from "../../../../types/app";

interface IProps {}

const schema = yup
  .object({
    comment: yup.string().required(),
  })
  .required();

const PostId: NextPage<IProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<IComment>({
    resolver: yupResolver(schema),
  });

  // https://nextjs.org/docs/routing/dynamic-routes
  // https://swr.vercel.app/docs/with-nextjs
  const { query, back } = useRouter();

  const postId = query.id;
  // console.log("query", router.query);
  // let demoId: any;
  // demoId = query.id;
  // if (!demoId && typeof window !== "undefined") {
  //   demoId = window.location.pathname.split("/").pop();
  // }

  const { data: post, error: postError } = useSWR<IPost>(
    `/api/demo/posts/${postId}`
  );
  const {
    data: comments,
    error: commentsError,
    mutate,
  } = useSWR<IComment[]>(`/api/demo/posts/${postId}/comments`);

  if (postError || commentsError) <p>Loading failed...</p>;
  if (!post && !comments)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  const onSubmit: SubmitHandler<IComment> = async (data) => {
    try {
      mutate((prevComments) => [
        ...prevComments!,
        {
          _id: uuidv4(),
          comment: data.comment,
          postId: postId as string,
        },
      ]);
      reset();
      await axios.post(`/api/demo/posts/${postId}/comments`, {
        comment: data.comment,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div onClick={() => back()}>Back</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center space-y-2 mx-auto w-full max-w-md border rounded p-5">
          <label className="label">
            <span className="label-text mr-5">Comment</span>
            <input
              {...register("comment")}
              type="text"
              className="input-primary input-bordered w-full"
            />
            <p>{errors.comment?.message}</p>
          </label>

          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
      <div className="flex justify-center">
        <h3>
          {post?.title} | <span>{post?.description}</span>
        </h3>
      </div>
      <div className="text-center">
        {comments?.map((c) => (
          <p key={c._id}>{c.comment}</p>
        ))}
      </div>
    </Layout>
  );
};

export default PostId;
