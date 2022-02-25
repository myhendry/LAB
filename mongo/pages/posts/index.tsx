import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Layout } from "../../components/common";

interface IProps {
  users: any[];
}

const Posts: NextPage<IProps> = ({ users }) => {
  //! Static Rendering with Dynamic Parameters
  return (
    <Layout>
      <div className="flex flex-col">
        {users.map((u) => (
          <Link key={u.id} href={`/posts/${u.id}`}>
            <a>{u.name}</a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  return {
    props: {
      users: res.data,
    },
    //! For Incremental Site Regeneration
    // revalidate: true
  };
};

export default Posts;
