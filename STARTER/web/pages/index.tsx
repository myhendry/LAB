import {
  Box,
  Heading,
  VStack,
  Text,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Navbar, MyModal } from "../modules/common";
import { MyLottie } from "../modules/main/lottie";

const Home: NextPage = () => {
  // https://github.com/vercel/next.js/tree/canary/examples/with-chakra-ui
  const { colorMode } = useColorMode();
  const [showModal, setShowModal] = useState<boolean>(false);

  const onOpen = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const notify = () => toast("Here is your toast.");

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
        <Button onClick={onOpen}>Open Modal</Button>
        <MyModal
          isOpen={showModal}
          onClose={onClose}
          onConfirm={() => console.log("hellooo")}
        >
          <Text>Hello World</Text>
        </MyModal>
        <Button onClick={notify}>Make me a toast</Button>
        <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
        <Link href={"/second"}>
          <a>Second</a>
        </Link>
      </VStack>
    </Box>
  );
};

export default Home;
