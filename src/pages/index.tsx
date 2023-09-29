/* eslint-disable formatjs/no-literal-string-in-jsx */
import { Box, Flex, Heading, VStack, useColorMode } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";
import Head from "next/head";
import { useIntl } from "react-intl";
import Nav from "~/components/nav";

export default function Home() {
  const intl = useIntl();
  const { colorMode } = useColorMode();

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
      <VStack as="main" w="full" gap="0">
        {/* Navigation */}
        <Nav />
        {/* Hero */}
        <Flex
          w="full"
          minW="sm"
          h="750"
          alignItems="center"
          position="relative"
          overflow="hidden"
        >
          {/* Spline */}
          <Box position="absolute" top="0" left="0" bottom="0" right="-500">
            <Spline scene="https://prod.spline.design/zmCqdmF-WwDqk3Mi/scene.splinecode" />
          </Box>
          {/* Tagline */}
          <VStack
            alignItems={["center", "flex-start"]}
            position="absolute"
            w="full"
            ml={[0, "50"]}
            mt={[-80, -40]}
            gap="4"
          >
            <Heading as="h1" size={["2xl", "4xl"]}>
              Daily puzzles.
            </Heading>
            <Heading as="h1" size={["2xl", "4xl"]} ml={[0, "40"]}>
              Play together.
            </Heading>
            <Heading as="h1" size={["2xl", "4xl"]} ml={[0, "20"]}>
              Exercise your mind.
            </Heading>
          </VStack>
        </Flex>
      </VStack>
    </>
  );
}
