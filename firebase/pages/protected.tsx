import { NextPage } from "next";
import { Layout } from "../components/common";
import { useAuth } from "../context/auth-context";
import { withProtected } from "../lib/routes";

interface IProps {}

const Protected: NextPage<IProps> = () => {
  return <Layout>I am Protected</Layout>;
};

export default withProtected(Protected);
