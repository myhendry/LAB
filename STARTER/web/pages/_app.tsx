import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import theme from "../styles/theme";
import AuthProvider from "../context/auth-context";
import AppProvider from "../context/app-context";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <Container>
            <motion.div
              key={router.route}
              initial="initial"
              animate="animate"
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
              }}
            >
              <Component {...pageProps} />
            </motion.div>
          </Container>
        </ChakraProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default MyApp;
