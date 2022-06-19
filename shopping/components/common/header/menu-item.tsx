import React, { ReactNode } from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

type Props = {
  to: string;
  children: ReactNode;
  [key: string]: any;
};

const MenuItem = ({ to, children, ...rest }: Props) => {
  return (
    <Link href={to} passHref>
      <Text display={"block"} {...rest}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
