import type { NextPage } from "next";
import { Box, Heading, VStack, Text, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

import Navbar from "../modules/common/navbar";
import { MyLottie } from "../modules/main/lottie";

const Home: NextPage = () => {
  // https://github.com/vercel/next.js/tree/canary/examples/with-chakra-ui
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Head>
        <title>H World</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <VStack
        display={"flex"}
        h={"80vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <MyLottie />
        <Heading color={colorMode === "light" ? "black" : "yellow"}>
          Welcome to H World
        </Heading>
        <Text color={colorMode === "light" ? "black" : "yellow"}>
          Live in the Present Moment
        </Text>
        <Link href={"/demo/text-sentiment"}>Text Sentiment</Link>
        <Link href={"/demo/image-classification"}>Image Classification</Link>
        <Link href={"/demo/video-classification"}>Video Classification</Link>
      </VStack>
    </Box>
  );
};

export default Home;
