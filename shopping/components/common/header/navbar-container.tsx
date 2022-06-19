import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  [key: string]: any;
  children: ReactNode;
};

/*
  https://youtu.be/EuIcKDR5eXc
  https://www.jimraptis.com/blog/create-a-navbar-with-chakra-ui-react#build-the-menulinks-components
  https://dev.to/shriram27/fixed-navbar-using-chakra-ui-4i7b
  */

const NavbarContainer = ({ children, ...props }: Props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavbarContainer;
