import { GetServerSideProps, NextPage } from "next";

import { Layout } from "../components/common";
import { supabase } from "../utils/client";

interface IProps {}

const Protected: NextPage<IProps> = () => {
  return <Layout>Protected</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Get our logged user
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // Check if the user is logged
  if (user === null) {
    // Redirect if no logged in
    return { props: {}, redirect: { destination: "/auth" } };
  }
  // If logged return the user
  return { props: { user } };
};

export default Protected;
