import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Modal, NavBar, Spinner } from "../components/common";

interface IProps {}

const Home: NextPage<IProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false);
  };

  /*
  todo
  - [ ] modal styling using with framer motion

  !# references
  Youtube The Net Ninja - Framer Motion (for React)
  https://youtu.be/Imyi2V7WgGU
  https://www.freecodecamp.org/news/how-to-add-interactive-animations-and-page-transitions-to-a-next-js-web-app-with-framer-motion/

  !# summary
  initial, animate, transition, variants
  - use array to apply keyframes

  !# initial
  - opacity
  - x
  - y

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

  return (
    <>
      {/* <NextSeo

      /> */}
      <NavBar title="L A B" />
      <div className="p-5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 2,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <h1 className="title">Wubba Lubba Dub Dub!</h1>
        </motion.div>
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
