/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable formatjs/no-literal-string-in-jsx */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  List,
  ListItem,
  Progress,
  Show,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  type GetServerSideProps,
  GetServerSidePropsResult,
  type NextPage,
} from "next";
import Head from "next/head";
import { useParams } from "next/navigation";
import {
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEvent,
  useMemo,
  useState,
  type MouseEventHandler,
  useEffect,
  useCallback,
} from "react";
import { api } from "~/utils/api";

const shuffle = <T,>(unShuffled: T[]): T[] =>
  unShuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const split = <T,>(array: T[], n: number): T[][] => {
  const result = [];
  for (let i = n; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
};

const makeLetterCollection = (letters: string[], centralLetter: string) => {
  const lettersWithoutCentralLetter = letters.filter(
    (letter) => letter !== centralLetter,
  );
  const rows = split(lettersWithoutCentralLetter, 3);
  const middleRowIndex = Math.floor(rows.length / 2);
  const middleElementIndex = Math.floor(rows[middleRowIndex]!.length / 2);
  rows[middleRowIndex]!.splice(middleElementIndex, 0, centralLetter);

  return rows;
};

const makeShuffledLetterCollection = (
  letters: string[],
  centralLetter: string,
) => {
  const lettersWithoutCentralLetter = letters.filter(
    (letter) => letter !== centralLetter,
  );
  const shuffledLetters = shuffle(lettersWithoutCentralLetter);
  const shuffledRows = split(shuffledLetters, 3);
  const middleRowIndex = Math.floor(shuffledRows.length / 2);
  const middleElementIndex = Math.floor(
    shuffledRows[middleRowIndex]!.length / 2,
  );
  shuffledRows[middleRowIndex]!.splice(middleElementIndex, 0, centralLetter);

  return shuffledRows;
};

const FoundWordBox = ({ words }: { words: string[] }) => {
  if (words.length === 0) return null;
  return (
    <VStack alignItems="center" gap="4" w="full" py="4">
      <Show below="lg">
        <Accordion w="full" borderColor="transparent" allowToggle>
          <AccordionItem>
            <Heading as="h3" size="md">
              <AccordionButton>
                <HStack w="full">
                  <Text>You have found {words.length || 0} word(s)</Text>
                  <AccordionIcon ml="auto" />
                </HStack>
              </AccordionButton>
            </Heading>
            <AccordionPanel>
              <SimpleGrid w="full" textAlign="center" columns={3} spacing={4}>
                {words.map((word) => (
                  <Text key={`found-word-${word}`} py="2">
                    {word.toUpperCase()}
                  </Text>
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Show>
      <Show above="lg">
        <Heading as="h3" size="md">
          <Text>You have found {words.length || 0} word(s)</Text>
        </Heading>
        <SimpleGrid w="full" textAlign="center" columns={3} spacing={4}>
          {words.map((word) => (
            <Text key={`found-word-${word}`} py="2">
              {word.toUpperCase()}
            </Text>
          ))}
        </SimpleGrid>
      </Show>
    </VStack>
  );
};

const ProgressDisplay = ({
  currentScore,
  maxScore,
}: {
  currentScore: number;
  maxScore: number;
}) => {
  const progress = useMemo<number>(() => {
    if (!maxScore) return 0;
    return (currentScore / maxScore) * 100;
  }, [maxScore, currentScore]);
  return (
    <VStack justify="center" w="full">
      <HStack justify="center" w="full">
        <p>{currentScore} Points</p>
      </HStack>
      <HStack justify="center" w="full">
        <p>🐍</p>
        <Progress w="full" maxW="md" colorScheme="green" value={progress} />
        <p>🦕</p>
      </HStack>
    </VStack>
  );
};

const GameControls = ({
  letters = [],
  centralLetter = "",
  onSubmit,
}: {
  letters: string[];
  centralLetter: string;
  onSubmit?: (word: string) => void;
}) => {
  const [shuffledLetters, setShuffledLetters] = useState<string[][]>(
    makeLetterCollection(letters, centralLetter),
  );
  const [wordInput, setWordInput] = useState<string>("");

  const handleWordInputOnChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    void setWordInput(e.target.value);

  const handleClearOnClick: MouseEventHandler<HTMLButtonElement> = () =>
    void setWordInput("");

  const handleOnLetterClick =
    (letter: string) => (_e: MouseEvent<HTMLButtonElement>) =>
      void setWordInput((prev) => prev + letter);

  const handleOnShuffleClick = (_e: MouseEvent<HTMLButtonElement>) => {
    setShuffledLetters(makeShuffledLetterCollection(letters, centralLetter));
  };

  const handleSubmitWord: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(wordInput);
      setWordInput("");
    }
  };

  return (
    <VStack gap="12" maxW="md" mx="auto">
      <VStack w="full">
        {shuffledLetters.map((row, i) => (
          <HStack key={`letter-row-${i}`} as={List}>
            {row.map((letter) => (
              <ListItem key={letter}>
                <Button
                  minW="75"
                  minH="75"
                  colorScheme={letter === centralLetter ? "green" : undefined}
                  onClick={handleOnLetterClick(letter.toLowerCase())}
                  size="lg"
                >
                  {letter.toUpperCase()}
                </Button>
              </ListItem>
            ))}
          </HStack>
        ))}
      </VStack>
      <VStack as="form" w="full" onSubmit={handleSubmitWord}>
        <HStack as={FormControl}>
          <Input
            textAlign="center"
            textTransform="uppercase"
            onChange={handleWordInputOnChange}
            placeholder="Type or click"
            type="text"
            value={wordInput}
          />
        </HStack>
        <HStack as={FormControl}>
          <Button flex="1" onClick={handleClearOnClick} variant="outline">
            Clear
          </Button>
          <Button flex="1" onClick={handleOnShuffleClick} variant="outline">
            Shuffle
          </Button>
          <Input flex="1" type="submit" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async (context) => {
  return {
    props: {
      id: context.params?.id as string,
    },
  };
};

const SpellingBeePage: NextPage<{ id: string }> = ({ id }) => {
  const toast = useToast();

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const { data: puzzle } = api.puzzle.getPuzzle.useQuery(id, {
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const includesOnlyValidLetters = useCallback(
    (word: string) =>
      word
        .toLowerCase()
        .split("")
        .every((letter) => puzzle?.data.letters.includes(letter)),
    [puzzle?.data.letters],
  );

  const isAlreadyFoundWord = useCallback(
    (word: string) => foundWords.includes(word),
    [foundWords],
  );

  const makeSuccessToast = useCallback(
    (message: string) =>
      void toast({
        title: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      }),
    [toast],
  );

  const makeWarningToast = useCallback(
    (message: string) =>
      void toast({
        title: message,
        status: "warning",
        duration: 3000,
        isClosable: true,
      }),
    [toast],
  );

  const updateProgress = useCallback(
    (word: string, wordScore: number) => {
      setFoundWords((prev) => {
        const newState = [...prev, word];
        localStorage.setItem(
          `spelling-bee-found-words-${puzzle?.id}`,
          JSON.stringify(newState),
        );
        return newState;
      });

      setScore((prev) => {
        const newState = prev + wordScore;
        localStorage.setItem(
          `spelling-bee-score-${puzzle?.id}`,
          JSON.stringify(newState),
        );
        return newState;
      });
    },
    [puzzle?.id],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!puzzle?.id) return;

    const stringifiedFoundWords = localStorage.getItem(
      `spelling-bee-found-words-${puzzle?.id}`,
    );
    const stringifiedScore = localStorage.getItem(
      `spelling-bee-score-${puzzle?.id}`,
    );

    if (!stringifiedFoundWords || !stringifiedScore) return;

    const parsedFoundWords = JSON.parse(stringifiedFoundWords) as string[];
    setFoundWords(parsedFoundWords);

    const parsedScore = JSON.parse(stringifiedScore) as number;
    setScore(parsedScore);
  }, [puzzle?.id]);

  const handleOnSubmit = (word: string) => {
    if (!puzzle) return;

    if (word.length === 0) return makeWarningToast("No word provided");

    if (word.length < 4)
      return void makeWarningToast("Words must be at least 4 letters long");

    if (!includesOnlyValidLetters(word))
      return void makeWarningToast("Word contains an invalid letter");

    const wordScore = puzzle.data.answers[word.toLowerCase()];

    if (!wordScore) return makeWarningToast("Unknown word");

    if (isAlreadyFoundWord(word))
      return makeWarningToast("Already got that one!");

    updateProgress(word, wordScore);
    makeSuccessToast("Nice!");
  };

  return (
    <>
      <Head>
        <title>Spelling Boa - Todays Wundrum</title>
      </Head>
      {/* Title */}
      <VStack w="full" mt="8" mb="8">
        <Heading as="h2">Spelling Boa</Heading>
        <Text fontSize="sm" textAlign="center" fontStyle="italic">
          Make as many words as possible with the letters provided. Every word
          must include the highlighted letter.
        </Text>
      </VStack>
      {/* Game Box */}
      <Stack
        direction={["column", null, null, "row-reverse"]}
        gap="10"
        w="full"
        maxW={["xl", null, null, "6xl"]}
        minH="600px"
        mx="auto"
      >
        {/* Progress & Found Words */}
        <Box
          w="full"
          p="6"
          border="1px"
          borderColor="whiteAlpha.300"
          rounded="xl"
        >
          {puzzle && (
            <ProgressDisplay
              currentScore={score}
              maxScore={puzzle.data.maxScore ?? 0}
            />
          )}
          <FoundWordBox words={foundWords} />
        </Box>
        {/* Game Controls */}
        <Box w="full" my="auto">
          {puzzle && (
            <GameControls
              letters={puzzle.data.letters}
              centralLetter={puzzle.data.centralLetter}
              onSubmit={handleOnSubmit}
            />
          )}
        </Box>
      </Stack>
    </>
  );
};

export default SpellingBeePage;
