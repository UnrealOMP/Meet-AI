ALTER TABLE "meetings" RENAME COLUMN "recording_url" TO "recording_path";--> statement-breakpoint
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "meetings" ALTER COLUMN "status" SET DEFAULT 'processing';