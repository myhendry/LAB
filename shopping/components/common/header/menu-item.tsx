import React, { ReactNode } from "react";
import Link from "next/link";
import { Text, useColorModeValue } from "@chakra-ui/react";

type Props = {
  to: string;
  children: ReactNode;
  [key: string]: any;
};

const MenuItem = ({ to, children, ...rest }: Props) => {
  const color = useColorModeValue("gray.800", "white");

  return (
    <Link href={to} passHref>
      <Text display={"block"} cursor="pointer" color={color} {...rest}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
