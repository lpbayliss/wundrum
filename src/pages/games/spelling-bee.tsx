/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable formatjs/no-literal-string-in-jsx */
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  FormControl,
  HStack,
  Heading,
  Input,
  List,
  ListItem,
  Progress,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEvent,
  useMemo,
  useState,
} from "react";
import Nav from "~/components/nav";
import { api } from "~/utils/api";

const SpellingBeePage = () => {
  const toast = useToast();

  const { data: puzzle } = api.puzzle.getPuzzle.useQuery("SPELLING_BEE", {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const [wordInput, setWordInput] = useState<string>("");
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  const progress = useMemo<number>(() => {
    if (!puzzle?.data?.maxScore) return 0;
    return (score / puzzle.data.maxScore) * 100;
  }, [puzzle?.data?.maxScore, score]);

  const handleWordInputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWordInput(e.target.value);
  };

  const handleSubmitWord: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (!puzzle?.data)
      return void toast({
        title: "No puzzle data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    if (!wordInput || wordInput.length === 0)
      return void toast({
        title: "No word provided",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    if (wordInput.length < 4)
      return void toast({
        title: "Words must be at least 4 letters long",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    const word = puzzle.data.answers[wordInput.toLowerCase()];
    if (!word)
      return void toast({
        title: "Unknown word",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    if (foundWords.includes(wordInput))
      return void toast({
        title: "Already got that one!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    setFoundWords((prev) => [...prev, wordInput]);
    setScore(
      (prev) => prev + (puzzle?.data?.answers[wordInput.toLowerCase()] ?? 0),
    );
    setWordInput("");

    toast({
      title: "Nice!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLetterClick =
    (letter: string) => (_e: MouseEvent<HTMLButtonElement>) => {
      setWordInput((prev) => prev + letter);
    };

  return (
    <VStack as="main" w="full" gap="8">
      {/* Navigation */}
      <Nav />
      <Heading as="h2">Spelling Bee</Heading>
      <Box maxW="4xl" overflowX="hidden">
        {puzzle && (
          <VStack gap="4">
            <HStack w="full">
              <p>😴</p>
              <Progress colorScheme="orange" w="full" value={progress} />
              <p>🏆</p>
            </HStack>
            <HStack as={List}>
              {puzzle.data?.letters.map((letter) => (
                <ListItem key={letter}>
                  <Button
                    colorScheme={
                      letter === puzzle.data?.centralLetter
                        ? "orange"
                        : undefined
                    }
                    onClick={handleLetterClick(letter.toLowerCase())}
                  >
                    {letter.toUpperCase()}
                  </Button>
                </ListItem>
              ))}
            </HStack>
            <VStack as="form" w="full" onSubmit={handleSubmitWord}>
              <FormControl>
                <Input
                  type="text"
                  textAlign="center"
                  textTransform="uppercase"
                  value={wordInput}
                  onChange={handleWordInputOnChange}
                />
                <Input hidden type="submit" />
              </FormControl>
            </VStack>
            {foundWords.length && (
              <>
                <Divider my="4" />
                <HStack w="full" h="100" alignItems="flex-start">
                  <SimpleGrid
                    columns={2}
                    spacing={4}
                    w="full"
                    textAlign="center"
                  >
                    {foundWords.map((word) => (
                      <Card
                        key={`found-word-${word}`}
                        variant="outline"
                        bg="wundrum-body-bg"
                      >
                        <CardBody py="2" fontWeight="bold">
                          {word.toUpperCase()}
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </HStack>
              </>
            )}
          </VStack>
        )}
      </Box>
    </VStack>
  );
};

export default SpellingBeePage;
