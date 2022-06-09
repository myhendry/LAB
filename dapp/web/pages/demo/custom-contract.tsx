import React from "react";
import { Box } from "@chakra-ui/react";

import { CryptoForm } from "../../modules/demo";

type Props = {};

const CustomContract = (props: Props) => {
  return (
    <Box>
      <CryptoForm />
    </Box>
  );
};

export default CustomContract;
