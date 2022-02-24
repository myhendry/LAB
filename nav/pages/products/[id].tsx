import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../components/common";

interface IProps {}

const Product: NextPage<IProps> = () => {
  const { query } = useRouter();

  let productId: any;
  productId = query.productId;
  if (!productId && typeof window !== "undefined") {
    productId = window.location.pathname.split("/").pop();
  }
  return <Layout title="N A V">{productId}</Layout>;
};

export default Product;
