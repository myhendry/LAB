import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { getAuth } from "firebase-admin/auth";

import { db } from "../../config/firebase";
import { useAuth } from "../../context/auth-context";
import { firebaseAdmin } from "../../config/firebase-admin";
import Navbar from "../../modules/common/navbar";

type Props = {};

const Template = (props: Props) => {
  return (
    <Box>
      <Navbar />
      <Box>
        <Text>Template</Text>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await getAuth(firebaseAdmin.getApp()).verifyIdToken(
      cookies.token
    );
    const { uid } = token;

    return {
      props: {
        uid,
      },
    };
  } catch (error) {
    return { props: {} as never, redirect: { destination: "/auth" } };
  }
};

export default Template;
