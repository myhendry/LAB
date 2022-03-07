import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";

import { Layout } from "../../components/common";
import clientPromise from "../../lib/mongodb";

interface IProps {
  tweets: {
    _id: string;
    name: string;
  }[];
}

const Tweets: NextPage<IProps> = ({ tweets }) => {
  //!  Server Side Rendering with Dynamic Parameters
  return (
    <Layout>
      <div className="flex flex-col">
        {tweets.map((t) => (
          <Link key={t._id} href={`/tweets/${t._id}`}>
            <a>{t.name}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = await clientPromise;
  const db = await client.db();
  const tweets = await db.collection("samples").find({}).toArray();

  return {
    props: {
      tweets: JSON.parse(JSON.stringify(tweets)),
    },
  };
};

export default Tweets;
