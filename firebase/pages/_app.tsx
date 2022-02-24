import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";

import { DefaultSeoValues } from "../next-seo.config";

// export function reportWebVitals(metric: any) {
//   console.log("Metric", metric);
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="container mx-auto space-y-5">
      <DefaultSeo {...DefaultSeoValues} />
      <ThemeProvider defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}

export default MyApp;
