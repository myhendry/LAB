import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/common";

interface IProps {}

const Catches: NextPage<IProps> = () => {
  const {
    query: { params = [] },
  } = useRouter();

  return (
    <Layout>
      <h1>Using Catch All Routes http://localhost:3000/catches/abc/def</h1>
      <p>
        If use [...params].tsx in file name WILL NOT catch queries to
        localhost:3000/catches
      </p>
      <p>
        If use [[...params]].tsx in file name WILL ALSO catch queries to
        localhost:3000/catches
      </p>
      <div className="divider" />
      <p>{params[0]}</p>
      <p>{params[1]}</p>
      <p>{params[2]}</p>
    </Layout>
  );
};

export default Catches;
