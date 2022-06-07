import React, { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Badge, Box, Button, Center, Text, VStack } from "@chakra-ui/react";

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
  const { cart } = state;

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((p) => p.slug === product?.slug);
    const quantity = existItem ? existItem.quantity! + 1 : 1;

    if (product?.countInStock! < quantity) {
      alert("No more in Stock!");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <Box h={"100vh"}>
      <Navbar />
      <VStack>
        <Text>{product?.name}</Text>
        {product ? (
          <Button onClick={addToCartHandler}>Add to Cart</Button>
        ) : (
          <Button disabled>Not Available for Sale</Button>
        )}
        <Center>
          {cart.cartItems.length > 0 && (
            <Badge colorScheme={"green"}>
              {cart.cartItems.reduce((a, c) => a + c.quantity!, 0)}
            </Badge>
          )}
        </Center>
      </VStack>
    </Box>
  );
};

export default ProductDetails;
