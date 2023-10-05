import { TRPCClientError } from "@trpc/client";
import { desc } from "drizzle-orm";
import isToday from "date-fns/isToday";
import md5 from "md5";

import {
  type Context,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { PuzzleTypeSchema, puzzles } from "~/server/db/schema";
import { generateValidPuzzle } from "~/utils/puzzles/spelling-bee";

const fetchLatestOrCrewNewSpellingBeeUseCase = async (ctx: Context) => {
  const puzzle = (
    await ctx.db
      .select()
      .from(puzzles)
      .orderBy(desc(puzzles.createdAt))
      .limit(1)
  )[0];

  if (puzzle && isToday(puzzle.createdAt)) return puzzle;
  const newPuzzle = await generateValidPuzzle();

  const returned = (
    await ctx.db
      .insert(puzzles)
      .values({
        type: "SPELLING_BEE",
        schemaVersion: 1,
        data: newPuzzle,
        hash: md5(JSON.stringify(newPuzzle)),
      })
      .returning()
  )[0];
  if (!returned) throw new TRPCClientError("Failed to create puzzle");

  return returned;
};

export const puzzleRouter = createTRPCRouter({
  getPuzzle: publicProcedure
    .input(PuzzleTypeSchema)
    .query(async ({ ctx, input }) => {
      if (input === "SPELLING_BEE")
        return await fetchLatestOrCrewNewSpellingBeeUseCase(ctx);
      throw new TRPCClientError("Invalid puzzle type");
    }),
});
