import { useState } from "react";
import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { v4 as uuidv4 } from "uuid";
import { FiSkipBack } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";

import { Layout, Modal, Spinner } from "../../../../components/common";
import { IComment, IPost } from "../../../../types/app";
import { PostForm } from "../../../../components/app";
import { capitalizeFirstLetter } from "../../../../utils/capitalize_first_letter";
import { usePagination } from "../../../../utils/usePagination";

interface IProps {}

const schema = yup
  .object({
    comment: yup.string().required(),
  })
  .required();

const PostId: NextPage<IProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const { mutate } = useSWRConfig();

  const postId = query.id;

  const { mutate: mutatePosts } = usePagination<IPost>(`/api/demo/posts`);

  const {
    paginatedData: paginatedComments,
    error: commentsError,
    isReachedEnd,
    setPage,
    page,
    mutate: mutateComments,
  } = usePagination<IComment>(`/api/demo/posts/${postId}/comments`);

  const {
    data: post,
    error: postError,
    mutate: mutatePost,
  } = useSWR<IPost>(`/api/demo/posts/${postId}`);

  if (postError || commentsError) <p>Loading failed...</p>;
  if (!post && !paginatedComments)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );

  const onSubmit: SubmitHandler<IComment> = async (data) => {
    try {
      // mutateComments(
      //   (prevComments) => [
      //     [
      //       {
      //         _id: uuidv4(),
      //         comment: capitalizeFirstLetter(data.comment),
      //         postId: postId as string,
      //         clientOnly: true,
      //       },
      //     ],
      //     ...prevComments!,
      //   ],
      //   false
      // );
      reset();
      await axios.post(`/api/demo/posts/${postId}/comments`, {
        comment: data.comment,
      });
      mutateComments();
    } catch (error) {
      console.log(error);
    }
  };

  // todo
  const onDelete = async (postId: string) => {
    await axios.delete(`/api/demo/posts/${postId}`);
    //mutate(`/api/demo/posts`); - doesn't mutate the data
    mutatePosts(); // mutates the data but gets conflicting keys
    replace("/demo/posts");
  };

  return (
    <Layout>
      <FiSkipBack
        className="cursor-pointer ml-14 my-5"
        onClick={() => back()}
      />
      <PostForm post={post} mutatePost={mutatePost} />
      <div className="flex flex-col justify-center space-y-2 mx-auto w-full max-w-md border rounded p-5">
        <button onClick={() => setShowModal(true)} className="btn btn-warning">
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
      <div className="flex justify-center my-2">
        <h3>
          {post?.title} | <span>{post?.description}</span>
        </h3>
      </div>

      <div className="my-2">
        <InfiniteScroll
          next={() => setPage(page + 1)}
          hasMore={!isReachedEnd}
          loader={<Spinner />}
          endMessage={
            paginatedComments.length === 0 ? (
              <p className="text-center">No Comment Found</p>
            ) : (
              <p className="text-center">End of Comments</p>
            )
          }
          dataLength={paginatedComments?.length}
        >
          <div className="text-center">
            {paginatedComments?.map((c) => (
              <p key={c._id}>{c.comment}</p>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => onDelete(postId as string)}
      >
        Confirm Delete?
      </Modal>
    </Layout>
  );
};

export default PostId;
