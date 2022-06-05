import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../../components/common";

type Props = {};

const Slug: NextPage<Props> = ({}: Props) => {
  const {
    query: { slug },
  } = useRouter();
  console.log(slug);

  return (
    <Box h={"100vh"}>
      <Navbar />
      Slug
    </Box>
  );
};

export default Slug;
