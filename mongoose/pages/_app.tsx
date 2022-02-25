import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { SWRConfig } from "swr";
import axios from "axios";

import { DefaultSeoValues } from "../next-seo.config";

// export function reportWebVitals(metric: any) {
//   console.log("Metric", metric);
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="container mx-auto space-y-5">
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((r) => r.data),
          //* using fetch instead of axios setup
          // fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <DefaultSeo {...DefaultSeoValues} />
        <ThemeProvider defaultTheme="system">
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </main>
  );
}

export default MyApp;
