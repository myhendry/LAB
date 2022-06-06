import React, { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Button, Text } from "@chakra-ui/react";

import { Navbar } from "../../components/common";
import data from "../../utils/data";
import { Store } from "../../utils/store";

type Props = {};

const ProductDetails: NextPage<Props> = ({}: Props) => {
  const {
    query: { slug },
  } = useRouter();

  const product = data.products.find((p) => p.slug === slug);

  const { state, dispatch } = useContext(Store);
  console.log(state);

  const addToCartHandler = () => {
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  };

  return (
    <Box h={"100vh"}>
      <Navbar />
      <Text>{product?.name}</Text>
      {product ? (
        <Button onClick={addToCartHandler}>Buy</Button>
      ) : (
        <Button disabled>Not Available for Sale</Button>
      )}
    </Box>
  );
};

export default ProductDetails;
