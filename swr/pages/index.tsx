import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { NavBar, ThemeChanger } from "../components/common";

// https://daisyui.com/components/hero
// https://github.com/garmeeh/next-seo

interface IProps {}

const Home: NextPage<IProps> = () => {
  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="L A B" />
      <div className="flex flex-col items-center">
        <ThemeChanger />
      </div>
      <div className="flex flex-row border rounded p-2 mx-5 space-x-5">
        <Link href={"/demo/posts"}>
          <a>Posts</a>
        </Link>
        <Link href={"/second"}>
          <a>Second</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
