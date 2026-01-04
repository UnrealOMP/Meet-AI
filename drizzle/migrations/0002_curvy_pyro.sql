ALTER TABLE "meetings" ALTER COLUMN "status" SET DEFAULT 'created';--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "recording_url" text;