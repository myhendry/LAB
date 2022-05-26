import Link from "next/link";
import React from "react";

import { AuthForm } from "../modules/common";

type Props = {};

const Auth = (props: Props) => {
  // https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/
  // https://travis.media/how-to-use-firebase-with-react/#20211130-authentication
  // https://colinhacks.com/essays/nextjs-firebase-authentication
  return (
    <>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>

      <AuthForm />
    </>
  );
};

export default Auth;
