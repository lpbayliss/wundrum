/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable formatjs/no-literal-string-in-jsx */
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  HStack,
  Heading,
  Input,
  List,
  ListItem,
  Progress,
  SimpleGrid,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import Nav from "~/components/nav";
import { api } from "~/utils/api";

interface ISubmitWordForm {
  word: string;
}

const SpellingBeePage = () => {
  const toast = useToast();

  const { register, handleSubmit, reset } = useForm<ISubmitWordForm>();

  const { data: puzzle } = api.puzzle.getPuzzle.useQuery("SPELLING_BEE", {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  const progress = useMemo<number>(() => {
    if (!puzzle?.data?.maxScore) return 0;
    return (score / puzzle.data.maxScore) * 100;
  }, [puzzle?.data?.maxScore, score]);

  const handleSubmitWord: SubmitHandler<ISubmitWordForm> = (data) => {
    if (!puzzle?.data)
      return void toast({
        title: "Couldn't submit word",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    if (!data.word)
      return void toast({
        title: "You must include a word",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    if (data.word.length < 4)
      return void toast({
        title: "Word must be at least 4 letters",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    if (puzzle.data.answers[data.word.toLowerCase()]) {
      if (foundWords.includes(data.word))
        return void toast({
          title: "Already got that one!",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });

      setFoundWords((prev) => [...prev, data.word]);
      setScore(
        (prev) => prev + (puzzle?.data?.answers[data.word.toLowerCase()] ?? 0),
      );
      toast({
        title: "Nice!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    return void reset();
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
                  >
                    {letter.toUpperCase()}
                  </Button>
                </ListItem>
              ))}
            </HStack>
            <VStack
              as="form"
              w="full"
              onSubmit={handleSubmit(handleSubmitWord)}
            >
              <FormControl>
                <Input
                  {...register("word")}
                  type="text"
                  textAlign="center"
                  textTransform="uppercase"
                />
                <Input hidden type="submit" />
              </FormControl>
            </VStack>
            <HStack w="full" h="100">
              <SimpleGrid columns={2} spacing={4} w="full" textAlign="center">
                {foundWords.map((word) => (
                  <Card key={`found-word-${word}`}>
                    <CardBody py="2" fontWeight="bold">
                      {word.toUpperCase()}
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </HStack>
          </VStack>
        )}
      </Box>
    </VStack>
  );
};

export default SpellingBeePage;
