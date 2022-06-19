import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  [key: string]: any;
};

const Logo = (props: Props) => {
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box {...props}>
      <Link href={"/"} passHref>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={color}
          cursor="pointer"
        >
          Logo
        </Text>
      </Link>
    </Box>
  );
};

export default Logo;
