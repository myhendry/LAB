import { NextPage } from "next";

import { Layout } from "../components/common";

interface IProps {}

const Design: NextPage<IProps> = () => {
  return (
    <Layout>
      <div className="md:flex">
        <div className="w-24 h-24 md:w-48 md:h-48 bg-green-400 flex justify-center items-center">
          block 1
        </div>
        <div className="w-24 h-24 bg-yellow-400 flex justify-center items-center">
          block 2
        </div>
        <div className="w-24 h-24 bg-blue-400 flex justify-center items-center">
          block 3
        </div>
        <div className="w-24 h-24 bg-red-400 flex justify-center items-center">
          block 4
        </div>
        <div className="w-24 h-24 bg-gray-400 flex justify-center items-center">
          block 5
        </div>
      </div>
    </Layout>
  );
};

export default Design;
