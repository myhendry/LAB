import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Layout, Spinner } from "../components/common";

interface IProps {}

const Welcome: NextPage<IProps> = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return <Layout>{session?.user?.name}</Layout>;
};

export default Welcome;
