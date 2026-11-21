ALTER TABLE "users" ALTER COLUMN "social_links" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cv_url" text;