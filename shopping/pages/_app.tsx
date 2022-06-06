import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { SWRConfig } from "swr";
import axios from "axios";
import { ChakraProvider, Container } from "@chakra-ui/react";

import theme from "../styles/theme";
import { DefaultSeoValues } from "../next-seo.config";
import { StoreProvider } from "../utils/store";

// export function reportWebVitals(metric: any) {
//   console.log("Metric", metric);
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...DefaultSeoValues} />
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((r) => r.data),
          //* using fetch instead of axios setup
          // fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <StoreProvider>
          <ChakraProvider theme={theme}>
            <Container>
              <Component {...pageProps} />
            </Container>
          </ChakraProvider>
        </StoreProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
