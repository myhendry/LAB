import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Box } from "@chakra-ui/react";

import { Navbar } from "../components/common";

interface IProps {}

const Home: NextPage<IProps> = () => {
  return (
    <div>
      <Head>
        <title>Shopping</title>
        <meta name="description" content="Shopping" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar title="Shopping" />
      <Box h={"100vh"}></Box>
    </div>
  );
};

export default Home;
