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
      <div className="flex flex-col">
        <Link href="/products/fasdfajj">
          <a>Product</a>
        </Link>
        <Link href="/catches/abc/123/def">
          <a>Catches</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
