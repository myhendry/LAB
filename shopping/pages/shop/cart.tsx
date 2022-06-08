import React, { useContext } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

import { Navbar } from "../../components/common";
import { Store } from "../../utils/store";

type Props = {};

const Cart = (props: Props) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  console.log("ci", cartItems);
  return (
    <Box h={"100vh"}>
      <Navbar />
      {cartItems.length === 0 ? (
        <Box>
          Cart is Empty.{" "}
          <Link href="/shop">
            <a>Go to Shop</a>
          </Link>
        </Box>
      ) : (
        <Box h={"100vh"}>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>

              <Tbody>
                {cartItems.map((p) => (
                  <Tr key={p.slug}>
                    <Td>
                      <Image
                        src={`${p.image}`}
                        alt={`${p.name}`}
                        height={150}
                        width={100}
                      />
                    </Td>
                    <Td>{p.name}</Td>
                    <Td>{p.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
