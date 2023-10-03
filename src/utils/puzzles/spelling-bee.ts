import { parse } from "csv-parse";
import { createReadStream } from "fs";
import path from "path";
import { z } from "zod";

const SpellingBeePuzzleSchema = z.object({
  letters: z.array(z.string()),
  centralLetter: z.string(),
  answers: z.record(z.string(), z.number()),
  maxScore: z.number(),
});
export type SpellingBeePuzzle = z.infer<typeof SpellingBeePuzzleSchema>;

const loadWords = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const words: string[] = [];
    const dataPath = path.resolve(process.cwd(), "src/data");
    createReadStream(dataPath + "/word-list.csv")
      .pipe(parse({ delimiter: ",", from_line: 1 }))
      .on("data", (row: string[]) =>
        row[0] ? void words.push(row[0]) : void null,
      )
      .on("error", (error) => reject(error))
      .on("end", () => resolve(words));
  });
};

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const getPuzzleLetters = (letterCount = 7): string[] => {
  const letters = new Set<string>(alphabet);
  while (letters.size > letterCount) {
    letters.delete(alphabet[Math.floor(Math.random() * alphabet.length)]!);
  }
  return [...letters];
};

const getPuzzleCenterLetter = (letters: string[]): string =>
  letters[Math.floor(Math.random() * letters.length)]!;

const getPossibleWords = async (
  wordList: string[],
  letters: string[],
  centralLetter: string,
  minWordLength = 4,
): Promise<SpellingBeePuzzle["answers"]> => {
  const possibleWords: SpellingBeePuzzle["answers"] = {};
  for (const word of wordList) {
    if (word.length < minWordLength) continue;
    if (!word.includes(centralLetter)) continue;
    if (!word.split("").every((letter) => letters.includes(letter))) continue;
    const score = word.length - minWordLength + 1;
    possibleWords[word] = score;
  }
  return possibleWords;
};

const generatePuzzle = async (
  wordList: string[],
): Promise<SpellingBeePuzzle> => {
  const letters = getPuzzleLetters();
  const centralLetter = getPuzzleCenterLetter(letters);
  const answers = await getPossibleWords(wordList, letters, centralLetter);

  return {
    letters,
    centralLetter,
    answers,
    maxScore: Object.values(answers).reduce(
      (acc, answerScore) => acc + answerScore,
      0,
    ),
  };
};

export const generateValidPuzzle = async (
  minAnswers = 10,
  minScore = 100,
): Promise<SpellingBeePuzzle> => {
  const wordList = await loadWords();

  let validPuzzle = null;
  while (validPuzzle === null) {
    const puzzle = await generatePuzzle(wordList);
    if (
      Object.keys(puzzle.answers).length >= minAnswers &&
      puzzle.maxScore >= minScore
    )
      validPuzzle = puzzle;
  }
  return validPuzzle;
};
