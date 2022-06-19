import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorModeValue } from "@chakra-ui/react";

type Props = {};

export const ColorSchemeToggle = ({}: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("gray.800", "white");

  return (
    <IconButton aria-label="Toggle Mode" onClick={toggleColorMode}>
      {colorMode === "light" ? (
        <MoonIcon color={color} />
      ) : (
        <SunIcon color={color} />
      )}
    </IconButton>
  );
};
