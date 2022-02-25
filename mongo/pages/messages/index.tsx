import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Layout } from "../../components/common";

interface IProps {}

const Messages: NextPage<IProps> = () => {
  //!  Client Side Rendering with Dynamic Parameters
  const { data, error } = useSWR<{ id: string; name: string }[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!data) {
    return (
      <Layout>
        <Skeleton count={10} />
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
      <div className="flex flex-col">
        {data.map((d) => (
          <Link key={d.id} href={`/messages/${d.id}`}>
            <a>{d.name}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Messages;
