import React from "react";
import Lottie from "react-lottie";
import { useColorMode } from "@chakra-ui/react";

import animationData_dark from "../../public/perspective_yellow.json";
import animationData_white from "../../public/perspective.json";

type Props = {};

export const MyLottie = (props: Props) => {
  // https://lottiefiles.com/blog/working-with-lottie/how-to-use-lottie-in-react-app
  const { colorMode } = useColorMode();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:
      colorMode === "light" ? animationData_white : animationData_dark,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};
