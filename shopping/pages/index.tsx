import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
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
        <Center>
          <Link href={`/shop`}>
            <a>
              <Text>Shop Now</Text>
            </a>
          </Link>
        </Center>
      </Box>
    </>
  );
};

export default Home;
