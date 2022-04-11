import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillFastBackward } from "react-icons/ai";
import Video from "react-player";

import { Layout } from "../../components/common";
import { supabase } from "../../utils/client";

interface IProps {
  lesson: any;
}

const LessonDetails: NextPage<IProps> = ({ lesson }) => {
  /*  
  START tutorial demo
  ! USING CLIENT RENDERING WITH QUERY PARAMS
  ! https://leeyoongti.medium.com/fix-nextjs-router-query-not-working-in-useeffect-a2d9d0ac4703
  */
  const { query, back, isReady } = useRouter();
  const [tutorial, setTutorial] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (!isReady) return;
    (async () => {
      const { data } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", query.id)
        .single();
      setTutorial(data);
    })();
  }, [query.id, isReady]);
  console.log("tutorial demo", tutorial);
  // END tutorial Demo

  const [video, setVideo] = useState<{
    id: number;
    url: string;
  } | null>();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("videos")
        .select("*")
        .eq("id", lesson.id)
        .single();
      setVideo(data);
    })();
  }, [lesson.id]);

  return (
    <Layout>
      <div onClick={back}>
        <AiFillFastBackward size={40} />
      </div>
      <p>Lesson Detail</p>
      <p>{lesson?.title}</p>

      {video && <Video url={video.url} width="100%" />}
    </Layout>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;

  //! server-side rendering of lesson
  //! client-side rendering of video
  const { data } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", query.id)
    .single();

  return {
    props: {
      lesson: data,
    },
  };
};

export default LessonDetails;
