import { VStack } from "@chakra-ui/react";
import Nav from "./nav";
import { type PropsWithChildren } from "react";
import Head from "next/head";
import { useIntl } from "react-intl";

const Layout = ({ children }: PropsWithChildren) => {
  const intl = useIntl();

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: "APP_NAME" })}</title>
        <meta
          name="description"
          content={intl.formatMessage({ id: "APP_NAME" })}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack as="main" gap="0" w="full" minW="md">
        <Nav />
        <VStack gap="0" w="full" p="4">
          {children}
        </VStack>
        {/* TODO: Footer */}
      </VStack>
    </>
  );
};

export default Layout;
