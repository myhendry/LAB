import React from "react";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  [key: string]: any;
};

const Logo = (props: Props) => {
  return (
    <Box {...props}>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        Logo
      </Text>
    </Box>
  );
};

export default Logo;
