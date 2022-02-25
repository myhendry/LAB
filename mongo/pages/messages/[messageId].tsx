import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Layout } from "../../components/common";

interface IProps {}

const Message: NextPage<IProps> = () => {
  const { query } = useRouter();
  const { data, error } = useSWR<{ id: string; name: string }>(
    `https://jsonplaceholder.typicode.com/users/${query.messageId}`
  );

  if (!data) {
    return (
      <Layout>
        <h1>Loading... </h1>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1>Error Loading Page</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <p>{data.name}</p>
    </Layout>
  );
};

export default Message;
