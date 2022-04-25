import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "../../context/auth-context";
import { supabase } from "../../utils/client";
import { Layout } from "../../components/common";

interface IProps {}

const Lesson: NextPage<IProps> = () => {
  const [lessons, setLessons] = useState<
    { id: number; title: string }[] | null
  >([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("lessons").select("*");
      setLessons(data);
    })();
  }, []);

  return (
    <Layout>
      <div id="lessons" className="space-y-2">
        {lessons &&
          lessons.map((v) => (
            <Link href={`/lessons/${v.id}`} key={v.id}>
              <a className="cursor-pointer my-1">
                {/* <div className="card w-96 bg-primary text-primary-content m-2">
                  <div className="card-body">
                    <p>{v.title}</p>
                  </div>
                </div> */}
                <div>
                  <p>{v.title}</p>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Lesson;
