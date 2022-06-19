import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { Header } from "../../components/common";

type Props = {};

const Demo = ({}: Props) => {
  return (
    <>
      <Header />
      <Box h={"100vh"}>
        <Text>Hello</Text>
      </Box>
    </>
  );
};

export default Demo;
