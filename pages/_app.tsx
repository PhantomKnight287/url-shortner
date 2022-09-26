import { AppProps } from "next/app";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import "../styles/globals.css";
import { useState } from "react";

export default function App(props: any) {
  const { Component, ...pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={() => {
        setColorScheme(colorScheme === "dark" ? "light" : "dark");
      }}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
