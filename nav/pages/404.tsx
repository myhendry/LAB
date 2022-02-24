import { NextPage } from "next";

interface IProps {}

const PageNotFound: NextPage<IProps> = () => {
  //! Simple create a 404.tsx page
  return (
    <div>
      <h1>Custom Page Not Found!!!!!!</h1>
    </div>
  );
};

export default PageNotFound;
