import { GetServerSideProps, NextPage } from "next";

import { Layout } from "../components/common";
import { useAuth } from "../context/auth-context";
import { supabase } from "../utils/client";

interface IProps {}

const Dashboard: NextPage<IProps> = () => {
  const { user, isLoading } = useAuth();
  return (
    <Layout>
      <p>Dashboard</p>
      {!isLoading && (
        <p>
          {user?.is_subscribed
            ? `Subscribed: ${user.interval}`
            : `Not Subscribed`}
        </p>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
