import { NextPage } from "next";
import { Layout } from "../components/common";

interface Props {}

const Spinner: NextPage<Props> = (props) => {
  return (
    <Layout>
      <h1>Spinners</h1>
      <a
        className="cursor-pointer underline text-blue-600"
        target="_blank"
        href="https://tobiasahlin.com/spinkit/"
        rel="noopener noreferrer"
      >
        Tobiasahlin SpinKit
      </a>
      <style>
        {`
		.loader {
		border-top-color: #3498db;
		-webkit-animation: spinner 1.5s linear infinite;
		animation: spinner 1.5s linear infinite;
		}
		@-webkit-keyframes spinner {
		0% {
		-webkit-transform: rotate(0deg);
		}
		100% {
		-webkit-transform: rotate(360deg);
		}
		}
		@keyframes spinner {
		0% {
		transform: rotate(0deg);
		}
		100% {
		transform: rotate(360deg);
		}
		}
	`}
      </style>
      <div className="flex flex-col justify-center items-center">
        <p>Spinner 1</p>
        <div
          className="
		loader
		ease-linear
		rounded-full
		border-8 border-t-8 border-gray-200
		h-12
		w-12
			"
        ></div>
        <p>Spinner 2</p>
        <div
          className="
      animate-spin
      rounded-full
      h-32
      w-32
      border-t-2 border-b-2 border-purple-500
    "
        ></div>
        <p>Spinner 3</p>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>

        <p>Spinner 4</p>
        <div className="spinner1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`rect-${i}`} className={`rect${i + 1}`} />
          ))}
        </div>
        <div>
          <p>Spinner 5</p>
          <div className="spinner2">
            <div className="cube1"></div>
            <div className="cube2"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Spinner;
