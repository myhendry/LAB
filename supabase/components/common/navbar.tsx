import Link from "next/link";
import React from "react";
import {
  AiFillAccountBook,
  AiFillAlert,
  AiFillAliwangwang,
  AiFillAmazonCircle,
  AiFillBell,
} from "react-icons/ai";
import { useAuth } from "../../context/auth-context";

import { ThemeChanger } from "./theme-changer";

type Props = {
  title?: string;
};

const links = [
  {
    title: "Auth",
    url: "/auth",
    icon: <AiFillAccountBook size={50} />,
    tip: "Auth",
    isAuthShow: "no",
  },
  {
    title: "Protected",
    url: "/protected",
    icon: <AiFillAlert size={50} />,
    tip: "Protected",
    isAuthShow: "yes",
  },
  {
    title: "About",
    url: "/about",
    icon: <AiFillAmazonCircle size={50} />,
    tip: "About",
    isAuthShow: "always",
  },
];

export const Navbar = ({ title = "L A B" }: Props) => {
  const { isAuthenticated, signOut } = useAuth();
  console.log("nav isAuthenticated", isAuthenticated);

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">
            <span className="text-lg font-bold tracking-widest">{title}</span>
          </a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {links.map((l) => (
            <li key={l.title} className="hidden md:block">
              <Link href={l.url}>
                <a className="cursor-pointer">{l.title}</a>
              </Link>
            </li>
          ))}
          <li tabIndex={0} className="md:hidden">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </a>

            <ul className="bg-base-100">
              {links.map((l) => (
                <li key={l.title}>
                  <Link href={l.url}>
                    <a
                      className="cursor-pointer tooltip tooltip-left"
                      data-tip={l.tip}
                    >
                      {l.icon}
                    </a>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  onClick={signOut}
                  className="cursor-pointer tooltip tooltip-left"
                  data-tip="Exit"
                >
                  <AiFillAliwangwang size={40} color="red" />
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <ThemeChanger />
      </div>
    </div>
  );
};
