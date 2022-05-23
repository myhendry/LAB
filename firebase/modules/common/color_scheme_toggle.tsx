import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

type Props = {};

export const ColorSchemeToggle = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <IconButton mt={4} aria-label="Toggle Mode" onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </div>
  );
};
