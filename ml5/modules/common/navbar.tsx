import React, { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

import { ColorSchemeToggle } from "./color_scheme_toggle";
import { useAuth } from "../../context/auth-context";

type Props = {};

const unauthenticatedlinks = [
  {
    name: "Main",
    uri: "/",
  },
  {
    name: "Login",
    uri: "/auth",
  },
];

const authenticatedLinks = [
  {
    name: "Main",
    uri: "/",
  },
  { name: "Dashboard", uri: "/demo/dashboard" },
];

const Navbar = (props: Props) => {
  const [display, setDisplay] = useState<string>("none");
  const color = useColorModeValue("white", "gray.800");
  const { logout, user } = useAuth();

  const links = user ? authenticatedLinks : unauthenticatedlinks;

  return (
    <Box pb="20">
      <Link href="/">
        <a>
          <Heading position={"fixed"} left={"1rem"} mt={"1rem"}>
            Hello
          </Heading>
        </a>
      </Link>
      <Flex
        pos={"fixed"}
        top={"1rem"}
        right={"1rem"}
        alignItems="center"
        textAlign={"center"}
        align="center"
        justifyContent={"center"}
      >
        <Flex display={["none", "none", "flex", "flex"]} mr={"1rem"}>
          {links.map((link) => (
            <Link href={`${link.uri}`} key={link.name}>
              <Button
                as="a"
                variant="ghost"
                aria-label={`${link.name}`}
                w="100%"
                cursor={"pointer"}
              >
                {link.name}
              </Button>
            </Link>
          ))}
          {user && (
            <Button
              w="100%"
              cursor={"pointer"}
              variant="ghost"
              color="red.300"
              onClick={logout}
            >
              Exit
            </Button>
          )}
        </Flex>
        <ColorSchemeToggle />
        <IconButton
          aria-label="Open Menu"
          size="md"
          ml={2}
          icon={<HamburgerIcon />}
          display={["flex", "flex", "none", "none"]}
          onClick={() => setDisplay("flex")}
        />
      </Flex>

      <Flex
        w="100vw"
        h="100vh"
        bgColor={color}
        zIndex={20}
        pos="fixed"
        top="0"
        left="0"
        overflowY={"auto"}
        flexDir="column"
        display={display}
      >
        <Flex justify={"flex-end"}>
          <IconButton
            mt={4}
            mr={4}
            aria-label="Close Menu"
            size="md"
            icon={<CloseIcon />}
            onClick={() => setDisplay("none")}
          />
        </Flex>
        <Flex flexDir={"column"} align={"center"}>
          {links.map((link) => (
            <Link href={`${link.uri}`} key={link.name}>
              <Button
                as="a"
                variant="ghost"
                aria-label={`${link.name}`}
                w="100%"
                cursor={"pointer"}
              >
                {link.name}
              </Button>
            </Link>
          ))}
          {user && (
            <Button
              w="100%"
              cursor={"pointer"}
              variant="ghost"
              onClick={logout}
              color="red.300"
            >
              Exit
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
