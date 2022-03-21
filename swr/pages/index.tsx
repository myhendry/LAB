import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { NavBar, Spinner, ThemeChanger } from "../components/common";

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
      <Link href={"/second"}>
        <a>Second</a>
      </Link>
      <Spinner />
    </>
  );
};

export default Home;
