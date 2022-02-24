import axios from "axios";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";

import { Layout } from "../../components/common";

interface IProps {
  post: {
    id: string;
    name: string;
  };
}

const Post: NextPage<IProps> = ({ post }) => {
  return (
    <Layout>
      <p>{post.name}</p>
    </Layout>
  );
};

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
  };
};

export default Post;
