CREATE TABLE IF NOT EXISTS "wundrum_puzzles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"schema_version" integer NOT NULL,
	"data" jsonb,
	"hash" uuid NOT NULL
);
--> statement-breakpoint
DROP TABLE "wundrum_example";