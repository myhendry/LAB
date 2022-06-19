import React from "react";
import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

type Props = {
  toggle: () => void;
  isOpen: boolean;
};

const MenuToggle = ({ toggle, isOpen }: Props) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MinusIcon />}
    </Box>
  );
};

export default MenuToggle;
