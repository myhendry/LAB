import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import theme from "../styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
