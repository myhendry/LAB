import axios from "axios";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";

import { Layout } from "../../components/common";

interface IProps {
  post: {
    id: string;
    name: string;
  };
}

const Post: NextPage<IProps> = ({ post }) => {
  const router = useRouter();
  /*
  ! router.isFallback applicable only when 
  ! using with fallback: true. When fallback: false
  ! or fallback: 'blocking' then isFallback not applicable
  */
  // if (router.isFallback) {
  //   return <p>Loading</p>;
  // }

  return (
    <Layout>
      <div onClick={() => router.back()}>{`<< Back`}</div>
      <p>{post.name}</p>
    </Layout>
  );
};

//! Using fallback TRUE. Also available fallback 'blocking'
// export const getStaticPaths: GetStaticPaths = async (
//   context: GetStaticPathsContext
// ) => {
//   const paths = [
//     {
//       params: {
//         postId: "1",
//       },
//     },
//     {
//       params: {
//         postId: "2",
//       },
//     },
//     {
//       params: {
//         postId: "3",
//       },
//     },
//   ];

//   return {
//     paths,
//     fallback: true,
//   };
// };

//! Using fallback FALSE
export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  const posts = res.data;

  const paths = posts.map((post: any) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${params?.postId}`
  );

  return {
    props: {
      post: res.data,
    },
    //! For Incremental Site Regeneration
    // revalidate: true
  };
};

export default Post;
