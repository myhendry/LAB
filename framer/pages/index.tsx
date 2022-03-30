import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast as notice } from "react-toastify";
import toast from "react-hot-toast";
import { FaBeer } from "react-icons/fa";

import { Loader, Modal, NavBar, Spinner } from "../components/common";

interface IProps {}

/*
  !# references
  Youtube The Net Ninja - Framer Motion (for React)
  https://youtu.be/Imyi2V7WgGU
  https://www.freecodecamp.org/news/how-to-add-interactive-animations-and-page-transitions-to-a-next-js-web-app-with-framer-motion/

  !# summary
  initial, animate, transition, variants
  - use array to apply keyframes

  !# initial / animate
  - opacity
  - x
  - y
  - pathLength

  !# transition
  - delay
  - duration
  - yoyo // 
  - type: 'tween' / 'spring'
  - stiffness (number) // can only be used with 'spring'
  - mass // can only be used with 'spring' type
  - damping // can only be used with 'spring' type
  - when: 'beforeChildren',
  - staggerChildren (number)
  - ease: "easeInOut" |

  !# whileHover
  - scale
  - textShadow
  - boxShadow
  - originX
  - color

  !# Animate Presence
  <AnimatePresence>
            {showTitle && (
              <motion.h2
                exit={{
                  y: -1000,
                  opacity: 0,
                }}
              >
                Thank you for your Order
              </motion.h2>
            )}
  </AnimatePresence>
  */

const Home: NextPage<IProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { duration: 1 },
    },
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const notify1 = () => {
    notice.error("This is very nice very nice very nice!", {
      theme: "colored",
    });
  };

  const notify2 = () =>
    toast.custom(
      <div className="alert alert-info shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>New software update available.</span>
        </div>
      </div>
    );

  const onModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="L A B" />
      <div className="p-5">
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.5,
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
        </div>
        <motion.div
          id="react-icons-example"
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <FaBeer size={60} />
        </motion.div>
        <div id="svg-framer-example" className="flex-none">
          <button className="btn btn-square btn-ghost">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
              variants={svgVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                variants={pathVariants}
              ></motion.path>
            </motion.svg>
          </button>
        </div>
        <motion.h1 animate={{ marginTop: 200, opacity: 0.2 }}>Hello</motion.h1>

        <div id="modal-example">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Modal
          </button>

          <Modal
            show={showModal}
            onClose={onModalClose}
            onConfirm={() => console.log("success")}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, labore?
            In ex, unde quo placeat assumenda illum earum reprehenderit cumque?
          </Modal>
        </div>
        <div id="react-toastify-example">
          <button onClick={notify1} className="btn btn-primary my-2">
            Alert 1
          </button>
        </div>
        <div id="react-hot-toast-example">
          <button onClick={notify2} className="btn btn-primary my-2">
            Alert 2
          </button>
        </div>
      </div>

      <Spinner />
      <Loader />
    </>
  );
};

export default Home;
