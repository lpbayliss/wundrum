/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable formatjs/no-literal-string-in-jsx */
import { Button, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { type MouseEventHandler } from "react";

import { api } from "~/utils/api";

const SpellingBeePage = () => {
  const router = useRouter();
  const { data } = useSession();
  const createUserPuzzleMutation = api.puzzle.createUserPuzzle.useMutation({
    onSuccess: async (puzzleId): Promise<void> => {
      await router.push(`/games/spelling-boa/${puzzleId}`);
    },
  });

  const handleOnCreateButtonClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    createUserPuzzleMutation.mutate("SPELLING_BEE");
  };

  return (
    <>
      <Head>
        <title>Spelling Boa - Wundrum</title>
      </Head>
      <VStack gap="10" w="md" py="100">
        <Button as={Link} w="full" href="/games/spelling-boa/today" size="lg">
          Todays
        </Button>
        {data && (
          <Button w="full" onClick={handleOnCreateButtonClick} size="lg">
            Generate new
          </Button>
        )}
      </VStack>
    </>
  );
};

export default SpellingBeePage;
