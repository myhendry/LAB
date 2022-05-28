import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";

import theme from "../styles/theme";
import AuthProvider from "../context/auth-context";
import AppProvider from "../context/app-context";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ChakraProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default MyApp;
