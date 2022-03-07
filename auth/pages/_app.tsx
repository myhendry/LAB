import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { SessionProvider } from "next-auth/react";

import { DefaultSeoValues } from "../next-seo.config";
import { SWRConfig } from "swr";
import axios from "axios";

// export function reportWebVitals(metric: any) {
//   console.log("Metric", metric);
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main className="container mx-auto space-y-5">
      <DefaultSeo {...DefaultSeoValues} />
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((r) => r.data),
          //* using fetch instead of axios setup
          // fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <SessionProvider session={session}>
          <ThemeProvider defaultTheme="system">
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </SWRConfig>
    </main>
  );
}

export default MyApp;
