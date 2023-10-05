/* eslint-disable formatjs/no-literal-string-in-jsx */
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Flex
        pos="relative"
        align="center"
        overflow="hidden"
        w="full"
        minW="sm"
        h="750"
      >
        {/* Spline */}
        <Box pos="absolute" top="0" right="-500" bottom="0" left="0">
          <Spline scene="https://prod.spline.design/zmCqdmF-WwDqk3Mi/scene.splinecode" />
        </Box>
        {/* Tagline */}
        <VStack
          pos="absolute"
          alignItems={["center", "flex-start"]}
          gap="4"
          w="full"
          mt={[-80, -40]}
          ml={[0, "50"]}
        >
          <Heading as="h1" size={["2xl", "4xl"]}>
            Daily puzzles.
          </Heading>
          <Heading as="h1" ml={[0, "40"]} size={["2xl", "4xl"]}>
            Play together.
          </Heading>
          <Heading as="h1" ml={[0, "20"]} size={["2xl", "4xl"]}>
            Exercise your mind.
          </Heading>
        </VStack>
      </Flex>
    </>
  );
}
