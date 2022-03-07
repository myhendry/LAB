import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout } from "../../components/common";

type Event = {
  id: string;
  title: string;
};

interface IProps {
  events: Event[];
}

const Events: NextPage<IProps> = ({ events }) => {
  //!  Pre-rendering with SSR and Client Side Data Fetching and Filtering
  const [eventsList, setEventsList] = useState(events);

  const router = useRouter();

  const fetchNewEvents = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=1"
    );
    setEventsList(res.data);
    router.push("/events?limit=1&start=20&age=30");
  };
  return (
    <Layout>
      <button onClick={fetchNewEvents}>Click</button>
      <div className="flex flex-col">
        {eventsList.map((t) => (
          <Link key={t.id} href={`/events/${t.id}`}>
            <a>{t.title}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  // console.log("query", query); // query { limit: '10', start: '20', age: '30' }
  const { limit } = query;
  //console.log(query) // 1
  const queryString = limit ? `limit=${limit}` : "limit=10";

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/photos?_start=0&_${queryString}`
  );
  return {
    props: {
      events: res.data,
    },
  };
};

export default Events;
