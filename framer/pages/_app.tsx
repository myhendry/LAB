import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { SWRConfig } from "swr";
import axios from "axios";
import { motion } from "framer-motion";

import { DefaultSeoValues } from "../next-seo.config";
import AppProvider from "../context/app-context";

// export function reportWebVitals(metric: any) {
//   console.log("Metric", metric);
// }

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((r) => r.data),
        //* using fetch instead of axios setup
        // fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <DefaultSeo {...DefaultSeoValues} />
      <AppProvider>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          <ThemeProvider defaultTheme="system">
            <Component {...pageProps} />
          </ThemeProvider>
        </motion.div>
      </AppProvider>
    </SWRConfig>
  );
}

export default MyApp;
