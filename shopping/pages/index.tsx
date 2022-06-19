import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

import { Navbar } from "../components/common";

interface IProps {}

const Home: NextPage<IProps> = () => {
  return (
    <>
      <Head>
        <title>Shopping</title>
        <meta name="description" content="Shopping" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar title="Shopping" />
      <Box h={"100vh"}>
        <VStack>
          <Link href={`/shop`}>
            <a>
              <Text>Shop Now</Text>
            </a>
          </Link>
          <Link href={`/demo`}>
            <a>
              <Text>Demo</Text>
            </a>
          </Link>
        </VStack>
      </Box>
    </>
  );
};

export default Home;
