import { motion } from "framer-motion";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import { supabase } from "../utils/client";
import { Alert, Modal, Navbar, Spinner } from "../components/common";
import { useAuth } from "../context/auth-context";
import Link from "next/link";

// https://daisyui.com/components/hero
// https://github.com/garmeeh/next-seo

interface IProps {}

const Home: NextPage<IProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<{ id: number; title: string }[] | null>(
    []
  );
  const [lessons, setLessons] = useState<
    { id: number; title: string }[] | null
  >([]);
  const [videos, setVideos] = useState<
    | {
        id: number;
        title: string;
      }[]
    | null
  >([]);
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);

  const { user } = useAuth();
  console.log("U", user);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("notes").select("*");
      setNotes(data);
    })();

    // (async () => {
    //   const { data: lesson } = await supabase
    //     .from("notes")
    //     .select("*")
    //     .eq("id", 1)
    //     .single();
    //   console.log("lesson", lesson);
    // })();

    (async () => {
      const { data } = await supabase.from("lessons").select("*");
      setLessons(data);
    })();

    (async () => {
      const { data } = await supabase.from("videos").select("*");
      setVideos(data);
    })();
  }, []);

  const onClose = () => {
    setShowModal(false);
  };

  const notify = () =>
    toast.custom(<Alert message="Toast is a Success!" type="warning" />);

  return (
    <>
      {/* <NextSeo

      /> */}
      {/* <NavBar title="L A B" /> */}
      <Navbar />
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
        <div id="lessons">
          {lessons &&
            lessons.map((v) => (
              <Link href={`/lesson/${v.id}`} key={v.id}>
                <a className="cursor-pointer">
                  <p>{v.title}</p>
                </a>
              </Link>
            ))}
        </div>
        <div id="videos">
          {videos &&
            videos.map((v) => (
              <div key={v.id}>
                <p>{v.title}</p>
              </div>
            ))}
        </div>
        <div id="supabase-get">
          {notes &&
            notes.map((n) => (
              <div key={n.id}>
                <p>{n.title}</p>
              </div>
            ))}
        </div>
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
      </div>
    </>
  );
};

export default Home;
