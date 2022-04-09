import { NextPage, NextPageContext } from "next";
import { useEffect } from "react";
import { Layout } from "../../components/common";
import { supabase } from "../../utils/client";

interface IProps {
  lesson: any;
}

const LessonDetails: NextPage<IProps> = ({ lesson }) => {
  //   const { query } = useRouter();
  //   const [lesson, setLesson] = useState<{ id: number; title: string } | null>(
  //     null
  //   );

  //todo https://leeyoongti.medium.com/fix-nextjs-router-query-not-working-in-useeffect-a2d9d0ac4703
  //   useEffect(() => {
  //     (async () => {
  //       const { data } = await supabase
  //         .from("lessons")
  //         .select("*")
  //         .eq("id", query.id)
  //         .single();
  //       setLesson(data);
  //     })();
  //   }, [query]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("videos")
        .select("*")
        .eq("id", lesson.id)
        .single();
      console.log("videos", data);
    })();
  }, []);

  return (
    <Layout>
      <p>Lesson Detail</p>
      <p>{lesson?.title}</p>
    </Layout>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;

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
