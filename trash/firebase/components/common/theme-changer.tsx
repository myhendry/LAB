import { NextPage } from "next";
import { useTheme } from "next-themes";
import { useState } from "react";

interface IProps {}

export const ThemeChanger: NextPage<IProps> = () => {
  const { setTheme } = useTheme();
  const [active, setActive] = useState(true);

  return (
    <div className="btn-group flex justify-end">
      <button
        onClick={() => {
          setActive(true);
          setTheme("light");
        }}
        className={`btn btn-outline btn-xs ${active ? "btn-active" : ""}`}
      >
        Light
      </button>
      <button
        onClick={() => {
          setActive(false);
          setTheme("dark");
        }}
        className={`btn btn-outline btn-xs ${active ? "" : "btn-active"}`}
      >
        Dark
      </button>
    </div>
  );
};

export default ThemeChanger;
