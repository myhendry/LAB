import type { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { NavBar, ThemeChanger } from "../components/common";

// https://daisyui.com/components/hero
// https://github.com/garmeeh/next-seo

interface IProps {
  data: string;
}

const Home: NextPage<IProps> = ({ data }) => {
  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="M I S C" />
      <div className="flex flex-col items-center">
        <ThemeChanger />
      </div>
      <Link href={"/env"}>
        <a>Env</a>
      </Link>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const server_data = process.env.MY_DATA;

  return {
    props: {
      data: server_data,
    },
  };
};

export default Home;
