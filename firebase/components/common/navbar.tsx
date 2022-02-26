import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../../context/auth-context";

interface IProps {
  title: string;
}

export const NavBar: NextPage<IProps> = ({ title }) => {
  const { logOut, user } = useAuth();
  const router = useRouter();

  console.log(router.pathname, router.query, router.asPath);

  return (
    <div className="navbar my-2 mb-2 shadow-lg rounded-box">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 px-2 mx-2">
        <Link href="/">
          <a>
            <span className="text-lg font-bold tracking-widest">{title}</span>
          </a>
        </Link>
      </div>
      <div className="flex-none">
        {/* <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button> */}

        {router.pathname !== "/" && user && (
          <button onClick={logOut} className="btn btn-error btn-sm">
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};
