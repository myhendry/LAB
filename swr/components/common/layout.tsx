import React from "react";
import { NavBar } from "./navbar";

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title = "L A B" }) => {
  return (
    <div>
      <NavBar title={title} />
      {children}
    </div>
  );
};
