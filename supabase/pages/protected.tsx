import { NextPage } from "next";

import { Layout } from "../components/common";

interface IProps {}

const Protected: NextPage<IProps> = () => {
  return <Layout>Protected</Layout>;
};

export default Protected;
