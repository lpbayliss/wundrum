ALTER TABLE "wundrum_puzzle" DROP CONSTRAINT "wundrum_puzzle_id_created_by_unique";--> statement-breakpoint
ALTER TABLE "wundrum_puzzle" ADD CONSTRAINT "wundrum_puzzle_id_hash_created_by_unique" UNIQUE NULLS NOT DISTINCT("id","hash","created_by");