ALTER TABLE "portfolio_settings" ADD COLUMN "section_order" text;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "order_index" integer DEFAULT 0 NOT NULL;