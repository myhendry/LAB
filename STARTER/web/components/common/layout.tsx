import React from "react";

import { Navbar } from "./navbar";

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title = "L A B" }) => {
  return (
    <>
      <Navbar title={title} />
      <div className="p-5">{children}</div>
    </>
  );
};
