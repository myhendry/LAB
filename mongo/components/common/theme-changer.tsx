import { NextPage } from "next";
import { useTheme } from "next-themes";
import { useState } from "react";

interface IProps {}

export const ThemeChanger: NextPage<IProps> = () => {
  const { setTheme } = useTheme();
  const [active, setActive] = useState(true);

  return (
    <div className="py-2 flex justify-end">
      <div className="btn-group">
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
    </div>
  );
};

export default ThemeChanger;
