import { TRPCClientError } from "@trpc/client";
import { and, desc, eq, isNull } from "drizzle-orm";
import isToday from "date-fns/isToday";
import md5 from "md5";

import {
  type Context,
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { PuzzleTypeSchema, puzzles } from "~/server/db/schema";
import { generateValidPuzzle } from "~/utils/puzzles/spelling-bee";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const fetchLatestOrCrewNewSpellingBeeUseCase = async (ctx: Context) => {
  const puzzle = await ctx.db.query.puzzles.findFirst({
    where: isNull(puzzles.createdBy),
    orderBy: [desc(puzzles.createdAt)],
  });

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

const fetchAllSpellingBeePuzzlesForUserUseCase = async (
  limit: number,
  offset: number,
  ctx: Context,
) => {
  if (!ctx.session?.user) throw new TRPCError({ code: "FORBIDDEN" });

  const puzzleCollection = await ctx.db
    .selectDistinct()
    .from(puzzles)
    .where(
      and(
        eq(puzzles.type, "SPELLING_BEE"),
        eq(puzzles.createdBy, ctx.session.user.id),
      ),
    )
    .orderBy(desc(puzzles.createdAt))
    .limit(limit)
    .offset(offset);

  return puzzleCollection;
};

const createPuzzleForUser = async (ctx: Context) => {
  if (!ctx.session?.user) throw new TRPCError({ code: "FORBIDDEN" });

  const newPuzzle = await generateValidPuzzle();

  const returned = (
    await ctx.db
      .insert(puzzles)
      .values({
        type: "SPELLING_BEE",
        schemaVersion: 1,
        data: newPuzzle,
        createdBy: ctx.session?.user?.id,
        hash: md5(JSON.stringify(newPuzzle)),
      })
      .returning()
  )[0];

  if (!returned) throw new TRPCClientError("Failed to create puzzle");

  return returned.id;
};

const getPuzzleByIdForUser = async (ctx: Context, puzzleId: string) => {
  if (!ctx.session?.user) throw new TRPCError({ code: "FORBIDDEN" });

  const puzzle = await ctx.db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  });

  if (!puzzle) throw new TRPCClientError("Failed to find puzzle");
  if (puzzle.createdBy !== ctx.session.user.id)
    throw new TRPCClientError("FORBIDDEN");

  return puzzle;
};

export const puzzleRouter = createTRPCRouter({
  getTodaysPuzzle: publicProcedure
    .input(PuzzleTypeSchema)
    .query(async ({ ctx, input }) => {
      if (input === "SPELLING_BEE")
        return await fetchLatestOrCrewNewSpellingBeeUseCase(ctx);
      throw new TRPCClientError("Invalid puzzle type");
    }),
  getPuzzle: publicProcedure
    .input(z.string().uuid("id"))
    .query(async ({ ctx, input: puzzleId }) => {
      return getPuzzleByIdForUser(ctx, puzzleId);
    }),
  getAllPuzzlesForUser: protectedProcedure
    .input(
      z.object({
        type: PuzzleTypeSchema,
        limit: z.number().default(10),
        offset: z.number().default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.type === "SPELLING_BEE")
        return await fetchAllSpellingBeePuzzlesForUserUseCase(
          input.limit,
          input.offset,
          ctx,
        );
      throw new TRPCClientError("Invalid puzzle type");
    }),
  createUserPuzzle: protectedProcedure
    .input(PuzzleTypeSchema)
    .mutation(async ({ ctx, input }) => {
      if (input === "SPELLING_BEE") return await createPuzzleForUser(ctx);
      throw new TRPCClientError("Invalid puzzle type");
    }),
});
