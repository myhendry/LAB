import { NextPage } from "next";
import Link from "next/link";

import { Layout } from "../components/common";

interface IProps {}

const Home: NextPage<IProps> = () => {
  return (
    <Layout title="D B">
      <div className="flex flex-col">
        <div>
          <h1 className="font-bold">
            Static Rendering with Dynamic Parameters
          </h1>
          <Link href="/posts">
            <a className="ml-5 cursor-pointer">Posts</a>
          </Link>
        </div>
        <div>
          <h1 className="font-bold">Static Rendering</h1>
          <Link href="/cars">
            <a className="ml-5 cursor-pointer">Cars</a>
          </Link>
        </div>
        <div>
          <h1 className="font-bold">Server Side Rendering</h1>
          <Link href="/toys">
            <a className="ml-5 cursor-pointer">Toys</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
