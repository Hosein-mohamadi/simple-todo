import "@/styles/globals.css";
import { ChakraProvider, Container, theme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container maxWidth="container.lg" px={4} py={10}>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}
