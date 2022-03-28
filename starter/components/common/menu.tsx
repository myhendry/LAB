import Link from "next/link";
import React from "react";

interface ILink {
  title: string;
  url: string;
}

type Props = {
  links: ILink[];
};

export const Menu = ({ links }: Props) => {
  return (
    <ul className="menu menu-horizontal bg-base-100 rounded-box mx-3">
      {links.map((l) => (
        <li key={l.url}>
          <Link href={l.url}>
            <a>{l.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
