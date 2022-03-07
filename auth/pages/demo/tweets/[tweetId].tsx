import { ObjectID } from "bson";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../components/common";
import clientPromise from "../../lib/mongodb";

interface IProps {
  tweet: {
    _id: string;
    name: string;
  };
}

const Tweet: NextPage<IProps> = ({ tweet }) => {
  const router = useRouter();
  return (
    <Layout>
      <div onClick={() => router.back()}>{`<< Back`}</div>
      <p>
        {tweet._id} | {tweet.name}
      </p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params, req, res } = context;
  //console.log(req, res)
  const tweetId = params?.tweetId as string;

  const client = await clientPromise;
  const db = await client.db();
  const tweet = await db
    .collection("samples")
    .findOne({ _id: new ObjectID(tweetId) });

  return {
    props: {
      tweet: JSON.parse(JSON.stringify(tweet)),
    },
  };
};

export default Tweet;
