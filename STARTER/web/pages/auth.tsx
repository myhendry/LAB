import React from "react";
import { Box } from "@chakra-ui/react";

import { AuthForm } from "../modules/common";

type Props = {};

const Auth = (props: Props) => {
  // https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/
  // https://travis.media/how-to-use-firebase-with-react/#20211130-authentication
  // https://colinhacks.com/essays/nextjs-firebase-authentication
  return (
    <Box>
      <AuthForm />
    </Box>
  );
};

export default Auth;
