import React from "react";
import { NextPage } from "next";
import { Box, Text, Grid, GridItem, VStack } from "@chakra-ui/react";

import { Navbar } from "../../components/common";
import data from "../../utils/data";
import Image from "next/image";
import Link from "next/link";

interface IProps {}

const Shopping: NextPage<IProps> = () => {
  return (
    <Box h={"100vh"}>
      <Navbar />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {data.products.map((p) => (
          <GridItem
            key={p.slug}
            w="100%"
            h="100%"
            p={"2"}
            rounded={"md"}
            bg="lightcyan"
            cursor={"pointer"}
          >
            <Link href={`/shopping/${p.slug}`}>
              <a>
                <VStack>
                  <Image
                    src={`${p.image}`}
                    alt={`${p.name}`}
                    height={550}
                    width={400}
                  />
                  <Text>{p.name}</Text>
                </VStack>
              </a>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Shopping;
