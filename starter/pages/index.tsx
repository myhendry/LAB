import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useState } from "react";

import { Modal, NavBar, Spinner, ThemeChanger } from "../components/common";

// https://daisyui.com/components/hero
// https://github.com/garmeeh/next-seo

interface IProps {}

const Home: NextPage<IProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="L A B" />
      <div className="p-5">
        <div id="modal-example">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Modal
          </button>
          <Modal
            show={showModal}
            onClose={onClose}
            onConfirm={() => console.log("success")}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, labore?
            In ex, unde quo placeat assumenda illum earum reprehenderit cumque?
          </Modal>
        </div>
      </div>

      <Spinner />
    </>
  );
};

export default Home;
