"use client";

import { useActionState, useState } from "react";
import { updateArticleAction } from "@/actions/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, FileText, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Article } from "@/db/schema";

export default function EditArticleForm({
  article,
  userHandle,
}: {
  article: Article;
  userHandle: string;
}) {
  const updateWithId = updateArticleAction.bind(null, article.id);
  const [state, formAction, isPending] = useActionState(updateWithId, undefined);

  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/dashboard/articles"
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Articles</span>
      </Link>

      <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl p-8 sm:p-10 py-8 gap-0 space-y-6">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <FileText className="h-6 w-6 text-blue-400" />
            <span>Edit Article</span>
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Updating &ldquo;{article.title}&rdquo; (/{userHandle}/articles/{article.slug})
          </CardDescription>
        </CardHeader>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{state.error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Article Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="slug" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                URL Slug
              </Label>
              <Input
                id="slug"
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm font-mono text-zinc-100 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="excerpt" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Short Summary / Excerpt
            </Label>
            <Input
              id="excerpt"
              name="excerpt"
              type="text"
              defaultValue={article.excerpt || ""}
              className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="tags" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                name="tags"
                type="text"
                defaultValue={article.tags?.join(", ") || ""}
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="readTime" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Estimated Read Time
              </Label>
              <Input
                id="readTime"
                name="readTime"
                type="text"
                defaultValue={article.readTime || "5 min read"}
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Article Content (Markdown)
            </Label>
            <Textarea
              id="content"
              name="content"
              rows={12}
              defaultValue={article.content}
              required
              className="p-4 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm font-mono text-zinc-100 focus-visible:ring-emerald-500/40 resize-y leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  defaultChecked={article.isFeatured}
                  className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="text-xs text-zinc-300 font-medium">Feature on landing page</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  defaultChecked={article.isPublished}
                  className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="text-xs text-zinc-300 font-medium">Published</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-zinc-700 bg-zinc-900 text-xs font-semibold">
                <Link href="/dashboard/articles">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Changes...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
