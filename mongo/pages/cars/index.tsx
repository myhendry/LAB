import axios from "axios";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import { NavBar, ThemeChanger } from "../../components/common";
import clientPromise from "../../lib/mongodb";

// https://daisyui.com/components/hero
// https://github.com/garmeeh/next-seo

interface IProps {
  users: any[];
  samples: any[];
}

const Cars: NextPage<IProps> = ({ users, samples }) => {
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
      <h1 className="font-bold">Samples</h1>
      {samples?.map((s) => (
        <div key={s._id}>
          <p>{s.name}</p>
        </div>
      ))}
      <div className="divider"></div>
      <h1 className="font-bold">Users</h1>
      {users?.map((u) => (
        <div key={u.id}>
          <p>{u.name}</p>
        </div>
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  //! Use Mongo Lib
  const client = await clientPromise;
  const db = await client.db();
  const data = await db.collection("samples").find({}).toArray();

  //! Using Axios
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  return {
    props: {
      samples: JSON.parse(JSON.stringify(data)),
      users: res.data,
    },
  };
};

export default Cars;
