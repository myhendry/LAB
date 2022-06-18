import React from "react";
import { Box } from "@chakra-ui/react";
import { Form } from "../../modules/design";

type Props = {};

const Misc = (props: Props) => {
  return (
    <Box>
      <Form />
      <Misc />
    </Box>
  );
};

export default Misc;
