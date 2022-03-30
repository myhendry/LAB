import { NextPage } from "next";

interface IProps {}

//https://tailwindcss.com/docs/typography-plugin

export const Typo: NextPage<IProps> = () => {
  return (
    <article className="prose lg:prose-xl prose-slate flex flex-col items-center p-5">
      <h1>Garlic bread with cheese: What the science tells us</h1>
      <p>
        For years parents have espoused the health benefits of eating garlic
        bread with cheese to their children, with the food earning such an
      </p>
    </article>
  );
};
