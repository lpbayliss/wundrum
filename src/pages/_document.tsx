/* eslint-disable @next/next/no-document-import-in-page */
import { ColorModeScript } from "@chakra-ui/react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import theme from "~/theme/theme";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Wundrum | A collection of daily puzzle games to play alone or together"
          />
          <link rel="icon" href="/favicon.ico" />
          {/* <meta property="og:image" content={imgURL} /> */}
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;