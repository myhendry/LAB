import React, { useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import ml5 from "ml5";
import Navbar from "../../modules/common/navbar";

type Props = {};

const VideoClassification = (props: Props) => {
  //https://www.npmjs.com/package/react-webcam
  //https://codepen.io/mozmorris/pen/yLYKzyp?editors=0010
  let ml5: any;

  useEffect(() => {
    ml5 = require("ml5");
  }, []);

  return (
    <Box>
      <Navbar />
      <Heading>Video Classification</Heading>
    </Box>
  );
};

export default VideoClassification;
