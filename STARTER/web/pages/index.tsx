import { motion } from "framer-motion";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { FaBeer } from "react-icons/fa";

import { Alert, Modal, NavBar, Spinner } from "../components/common";
import Image from "next/image";

// https://daisyui.com/components/hero
// https://github.com/garmeeh/next-seo

interface IProps {}

const Home: NextPage<IProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false);
  };

  const notify = () =>
    toast.custom(<Alert message="Toast is a Success!" type="warning" />);

  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="L A B" />
      <div className="p-5 space-y-2">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <h1 className="title">Wubba Lubba Dub Dub!</h1>
        </motion.div>
        <motion.div
          id="react-icons-example"
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <FaBeer size={60} />
        </motion.div>
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
        <div id="toast-example">
          <button onClick={notify} className="btn btn-primary">
            Toast
          </button>
        </div>
        <div id="spinner-example">
          <Spinner />
        </div>
        <div id="skeleton-example">
          <Skeleton count={3} />
        </div>

        <div id="image">
          {/* https://github.com/vercel/next.js/tree/canary/examples/image-component */}
          {/* https://pixabay.com/ */}
          {/* https://unsplash.com/ */}
          <Image
            src="https://cdn.pixabay.com/photo/2022/03/23/21/27/road-7087957_960_720.jpg"
            alt="roadless-travelled"
            height={250}
            width={200}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
