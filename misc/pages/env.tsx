import type { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";

import { NavBar, ThemeChanger } from "../components/common";

// https://daisyui.com/components/hero
// https://github.com/garmeeh/next-seo

interface IProps {
  data: string;
}

const Env: NextPage<IProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="M I S C" />
      <div className="flex flex-col items-center">
        <ThemeChanger />
      </div>
      <div
        className="cursor-pointer"
        onClick={() => router.back()}
      >{`<< Back`}</div>
      <Link href={"/second"}>
        <a>Second</a>
      </Link>
      <div className="divider" />
      <h1 className="font-bold">Env</h1>
      <div>Server Data {data}</div>
      <div>Client Data {`${process.env.NEXT_PUBLIC_DATA}`}</div>
      <div>Client Data String {`${process.env.NEXT_PUBLIC_DATA2}`}</div>
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

export default Env;
