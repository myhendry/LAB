import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";
import { FiSkipBack } from "react-icons/fi";

import { Layout, Spinner } from "../../../../components/common";
import { IComment, IPost } from "../../../../types/app";
import { PostForm } from "../../../../components/app";
import { capitalizeFirstLetter } from "../../../../utils/capitalize_first_letter";

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
  const { query, back, push, replace } = useRouter();

  const postId = query.id;
  // console.log("query", router.query);
  // let demoId: any;
  // demoId = query.id;
  // if (!demoId && typeof window !== "undefined") {
  //   demoId = window.location.pathname.split("/").pop();
  // }

  const {
    data: post,
    error: postError,
    mutate: mutatePost,
  } = useSWR<IPost>(`/api/demo/posts/${postId}`);

  const {
    data: comments,
    error: commentsError,
    mutate: mutateComments,
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
      mutateComments(
        (prevComments) => [
          {
            _id: uuidv4(),
            comment: capitalizeFirstLetter(data.comment),
            postId: postId as string,
          },
          ...prevComments!,
        ],
        false
      );
      reset();
      await axios.post(`/api/demo/posts/${postId}/comments`, {
        comment: data.comment,
      });
      mutateComments();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (postId: string) => {
    await axios.delete(`/api/demo/posts/${postId}`);
    mutate(`/api/demo/posts`);
    replace("/demo/posts");
  };

  return (
    <Layout>
      <FiSkipBack className="cursor-pointer ml-14" onClick={() => back()} />
      <PostForm post={post} mutatePost={mutatePost} />
      <div className="flex flex-col justify-center space-y-2 mx-auto w-full max-w-md border rounded p-5">
        <button
          onClick={() => onDelete(postId as string)}
          className="btn btn-warning"
        >
          Delete Post
        </button>
      </div>
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

          <button className="btn btn-primary">Create Comment</button>
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
