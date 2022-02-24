import type { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { NavBar, ThemeChanger } from "../components/common";
import clientPromise from "../lib/mongodb";

// https://daisyui.com/components/hero
// https://github.com/garmeeh/next-seo

interface IProps {}

const Home: NextPage<IProps> = () => {
  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="M O N G O " />
      <div className="flex flex-col items-center">
        <ThemeChanger />
      </div>
      <Link href={"/second"}>
        <a>Second</a>
      </Link>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await clientPromise;
  const db = await client.db();
  const data = await db.collection("samples").find({}).toArray();
  console.log("data", data);
  return {
    props: {},
  };
};

export default Home;
