import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { SWRConfig } from "swr";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import { DefaultSeoValues } from "../next-seo.config";
import AppProvider from "../context/app-context";
import AuthProvider from "../context/auth-context";
import { supabase } from "../utils/client";

// export function reportWebVitals(metric: any) {
//   console.log("Metric", metric);
// }

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <main>
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((r) => r.data),
          //* using fetch instead of axios setup
          // fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <DefaultSeo {...DefaultSeoValues} />
        <AuthProvider supabaseClient={supabase}>
          <AppProvider>
            <ThemeProvider defaultTheme="system">
              <AnimatePresence exitBeforeEnter>
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
                  <Component {...pageProps} />
                  <Toaster position="bottom-center" />
                </motion.div>
              </AnimatePresence>
            </ThemeProvider>
          </AppProvider>
        </AuthProvider>
      </SWRConfig>
    </main>
  );
}

export default MyApp;
