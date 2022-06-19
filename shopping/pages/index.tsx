import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

import { Header } from "../components/common";

interface IProps {}

const Home: NextPage<IProps> = () => {
  return (
    <>
      <Head>
        <title>Shopping</title>
        <meta name="description" content="Shopping" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Box h={"100vh"}>
        <Container maxWidth={"container.xl"}>
          <Box display={"flex"} alignItems={"center"} px="20" flexDir={"row"}>
            <Box>
              <Heading>Welcome</Heading>
              <Box mt={6} mx={3} fontWeight={"medium"}>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
