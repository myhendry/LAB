import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import { Layout } from "../components/common";

interface IProps {
  data: string;
}

const Ssr: NextPage<IProps> = ({ data }) => {
  return (
    <Layout>
      <h1>SSR Authentication</h1>
      <p>{data}</p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        //todo cannot overwrite callbackUrl
        destination: `/auth?callbackUrl=http://localhost:3000/ssr`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      data: session
        ? "List of 100 private blog posts"
        : "List of 1000 public posts",
    },
  };
};

export default Ssr;
