/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable formatjs/no-literal-string-in-jsx */
import { Button, List, ListItem, Text, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
// import { useRouter } from "next/router";

import { api } from "~/utils/api";

const SpellingBeePage = () => {
  // const router = useRouter();
  const { data, status } = useSession();

  const { data: puzzleCollection } = api.puzzle.getAllPuzzlesForUser.useQuery({
    type: "SPELLING_BEE",
  });

  return (
    <>
      <Head>
        <title>Spelling Boa - Wundrum</title>
      </Head>
      <VStack gap="10" w="md" py="100">
        {puzzleCollection && (
          <List>
            {puzzleCollection.map((puzzle) => (
              <ListItem key={puzzle.id}>
                <Text>{puzzle.hash}</Text>
                <Button
                  as={Link}
                  w="full"
                  href={`/games/spelling-boa/${puzzle.id}`}
                  size="lg"
                >
                  Play
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </>
  );
};

export default SpellingBeePage;
