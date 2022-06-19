import React from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { HStack, useColorModeValue } from "@chakra-ui/react";
import { ColorSchemeToggle } from "./color_scheme_toggle";

type Props = {
  toggle: () => void;
  isOpen: boolean;
};

const MenuToggle = ({ toggle, isOpen }: Props) => {
  const color = useColorModeValue("gray.800", "white");

  return (
    <HStack
      display={{ base: "block", md: "none" }}
      onClick={toggle}
      cursor="pointer"
    >
      <ColorSchemeToggle />
      {isOpen ? <CloseIcon color={color} /> : <HamburgerIcon color={color} />}
    </HStack>
  );
};

export default MenuToggle;
