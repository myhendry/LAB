import Link from "next/link";
import React from "react";
import {
  AiFillAccountBook,
  AiFillAlert,
  AiFillAliwangwang,
  AiFillAmazonCircle,
  AiFillApple,
} from "react-icons/ai";

import { useAuth } from "../../context/auth-context";
import { ThemeChanger } from "./theme-changer";

type Props = {
  title?: string;
};

const authenticatedLinks = [
  {
    title: "Profile",
    url: "/profile",
    icon: <AiFillApple size={50} />,
    tip: "Profile",
  },
  {
    title: "Protected",
    url: "/protected",
    icon: <AiFillAlert size={50} />,
    tip: "Protected",
  },
  {
    title: "About",
    url: "/about",
    icon: <AiFillAmazonCircle size={50} />,
    tip: "About",
  },
];

const unAuthenticatedLinks = [
  {
    title: "About",
    url: "/about",
    icon: <AiFillAmazonCircle size={50} />,
    tip: "About",
  },
];

export const Navbar = ({ title = "L A B" }: Props) => {
  const { isAuthenticated, isLoading, logOut } = useAuth();

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
          {!isLoading && isAuthenticated
            ? authenticatedLinks.map((l) => (
                <li key={l.title} className="hidden md:block">
                  <Link href={l.url}>
                    <a className="cursor-pointer">{l.title}</a>
                  </Link>
                </li>
              ))
            : unAuthenticatedLinks.map((l) => (
                <li key={l.title} className="hidden md:block">
                  <Link href={l.url}>
                    <a className="cursor-pointer">{l.title}</a>
                  </Link>
                </li>
              ))}

          {!isLoading && isAuthenticated ? (
            <li className="hidden md:block">
              <a onClick={logOut}>Exit</a>
            </li>
          ) : (
            <li className="hidden md:block">
              <Link href="/auth">
                <a className="cursor-pointer">Auth</a>
              </Link>
            </li>
          )}

          {/* End of Desktop Links */}
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
              {isAuthenticated
                ? authenticatedLinks.map((l) => (
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
                  ))
                : unAuthenticatedLinks.map((l) => (
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
              {isAuthenticated ? (
                <li>
                  <a
                    onClick={logOut}
                    className="cursor-pointer tooltip tooltip-left"
                    data-tip="Exit"
                  >
                    <AiFillAliwangwang size={40} color="red" />
                  </a>
                </li>
              ) : (
                <li>
                  <Link href="/auth">
                    <a
                      className="cursor-pointer tooltip tooltip-left"
                      data-tip="Auth"
                    >
                      <AiFillAccountBook size={40} color="green" />
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </ul>
        <ThemeChanger />
      </div>
    </div>
  );
};
