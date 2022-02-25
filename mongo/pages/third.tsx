import { NextPage } from "next";

import { Layout } from "../components/common";

interface IProps {}

const Third: NextPage<IProps> = () => {
  //! Redirect configured in next.config.js
  return <Layout>Third</Layout>;
};

export default Third;
