import React from "react";
import { Box, Stack } from "@chakra-ui/react";

import MenuItem from "./menu-item";

type Props = {
  isOpen: boolean;
};

const MenuLinks = ({ isOpen }: Props) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "flex-end", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/shop">Shop</MenuItem>
        <MenuItem to="/demo">Demo</MenuItem>
      </Stack>
    </Box>
  );
};

export default MenuLinks;
