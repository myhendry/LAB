import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { Layout, Spinner } from "../components/common";

interface IProps {}

const Dashboard: NextPage<IProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return <Layout>Dashboard</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default Dashboard;
