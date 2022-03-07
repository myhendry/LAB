import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { NavBar, ThemeChanger } from "../components/common";
import { useAuth } from "../context/auth-context";

interface IProps {}

const Home: NextPage<IProps> = () => {
  const { user } = useAuth();
  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="L A B" />
      <ThemeChanger />
      <div className="flex flex-col items-center">
        {user ? (
          <Link href="/protected">
            <a>Protected</a>
          </Link>
        ) : (
          <Link href="/auth">
            <a>Sign In or Sign Up</a>
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
