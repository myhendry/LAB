import React from "react";
import { NavBar } from "./navbar";

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title = "L A B" }) => {
  return (
    <>
      <NavBar title={title} />
      <div className="flex items-center text-center justify-center">
        {children}
      </div>
    </>
  );
};
