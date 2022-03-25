import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useState } from "react";
import { Table } from "../components/app";

import { Modal, NavBar, ThemeChanger } from "../components/common";

// https://daisyui.com/components
// https://github.com/garmeeh/next-seo

interface IProps {}

const Home: NextPage<IProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="L A B" />

      <div>
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
        <div className="flex justify-center items-center p-5">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Modal
          </button>
        </div>
        <div className="mx-auto w-4/5">
          <Table />
        </div>
      </div>
      <Modal
        show={showModal}
        onConfirm={() => console.log("yeahh")}
        onClose={() => setShowModal(false)}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error at dicta
        iusto. Ipsa perferendis voluptates natus earum accusamus veritatis quod?
      </Modal>
    </>
  );
};

export default Home;
