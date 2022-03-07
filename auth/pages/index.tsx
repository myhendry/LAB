import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

import { Layout } from "../components/common";

interface IProps {}

/*
! Authentication
https://www.youtube.com/watch?v=im8o328q6EI
[Custom Pages, Callbacks and Events](https://www.youtube.com/watch?v=gzc1R4MoWAE)
https://next-auth.js.org/configuration/callbacks
https://github.com/nextauthjs/next-auth-example
https://github.com/nextauthjs/next-auth-typescript-example/blob/main/pages/api/auth/%5B...nextauth%5D.ts
*/
const Home: NextPage<IProps> = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Link href="/auth">
        <a>Go to Auth</a>
      </Link>
      <Link href="/dashboard">
        <a>Go to Dashboard</a>
      </Link>
      <Link href="/profile">
        <a>Go to Profile</a>
      </Link>
      <Link href="/ssr">
        <a>Go to SSR</a>
      </Link>
    </div>
  );
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

export default Home;
