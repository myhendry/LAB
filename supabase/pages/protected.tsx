import { ApiError } from "@supabase/supabase-js";
import { NextPage, NextPageContext } from "next";

import { Layout } from "../components/common";
import { useAuth } from "../context/auth-context";
import { supabase } from "../utils/client";

interface IProps {
  user: any;
}

interface User {
  token: string | null;
  user: User | null;
  data: User | null;
  error: ApiError | null;
}

const Protected: NextPage<IProps> = ({ user }) => {
  // const { signOut } = useAuth();

  return (
    <Layout>
      <h1>Protected</h1>
      {/* <button onClick={signOut} className="btn btn-primary">
        Log Out
      </button> */}
      <p>{user.email}</p>
    </Layout>
  );
};

export async function getServerSideProps({ req }: NextPageContext) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/auth" } };
  }

  return { props: { user } };
}

export default Protected;
