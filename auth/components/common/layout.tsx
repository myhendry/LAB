import React from "react";
import { NavBar } from "./navbar";

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title = "L A B" }) => {
  return (
    <>
      <NavBar title={title} />
      <div className="container mx-auto px-4">{children}</div>
    </>
  );
};
