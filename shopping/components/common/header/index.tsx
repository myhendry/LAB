import React, { useState } from "react";

import Logo from "./logo";
import MenuLinks from "./menu-links";
import MenuToggle from "./menu-toggle";
import NavbarContainer from "./navbar-container";

type Props = {
  [key: string]: any;
};

/*
  https://youtu.be/EuIcKDR5eXc
  https://www.jimraptis.com/blog/create-a-navbar-with-chakra-ui-react#build-the-menulinks-components
  https://dev.to/shriram27/fixed-navbar-using-chakra-ui-4i7b
  */

export const Header = ({ ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavbarContainer {...props}>
      <Logo
        w="100px"
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuToggle isOpen={isOpen} toggle={toggle} />
      <MenuLinks isOpen={isOpen} />
    </NavbarContainer>
  );
};
