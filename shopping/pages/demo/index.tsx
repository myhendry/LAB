import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";

import { Header } from "../../components/common";

type Props = {};

const Demo = ({}: Props) => {
  return (
    <>
      <Header />

      <Box h={"100vh"}>
        <Container maxWidth={"container.xl"}>
          <Box display={"flex"} alignItems={"center"} px="20" flexDir={"row"}>
            <Box>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Demo;
