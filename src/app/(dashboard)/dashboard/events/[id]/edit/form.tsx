"use client";

import { useActionState, useState } from "react";
import { updateEventAction } from "@/actions/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Calendar, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Event } from "@/db/schema";

export default function EditEventForm({
  event,
  userHandle,
}: {
  event: Event;
  userHandle: string;
}) {
  const updateWithId = updateEventAction.bind(null, event.id);
  const [state, formAction, isPending] = useActionState(updateWithId, undefined);

  const [title, setTitle] = useState(event.title);
  const [slug, setSlug] = useState(event.slug);

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/dashboard/events"
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Events</span>
      </Link>

      <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl p-8 sm:p-10 py-8 gap-0 space-y-6">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Calendar className="h-6 w-6 text-amber-400" />
            <span>Edit Event</span>
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Updating &ldquo;{event.title}&rdquo; (/{userHandle}/events/{event.slug})
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
                Event / Talk Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scaling Distributed Microservices with Rust"
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
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
                placeholder="scaling-distributed-microservices"
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="eventType" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Event Type
              </Label>
              <select
                id="eventType"
                name="eventType"
                defaultValue={event.eventType || "Speaking"}
                className="w-full h-11 px-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="Speaking">Speaking / Keynote</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Podcast">Podcast Appearance</option>
                <option value="Meetup">Community Meetup</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Date / Timeframe
              </Label>
              <Input
                id="date"
                name="date"
                type="text"
                defaultValue={event.date}
                placeholder="e.g. Oct 14, 2026 or Fall 2026"
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                defaultValue={event.location || ""}
                placeholder="e.g. San Francisco, CA or Virtual"
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="eventUrl" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              External Link / Slides / Recording URL (Optional)
            </Label>
            <Input
              id="eventUrl"
              name="eventUrl"
              type="url"
              defaultValue={event.eventUrl || ""}
              placeholder="https://conference.org/talks/your-talk"
              className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Description & Highlights (Visual Editor)
            </Label>
            <RichTextEditor
              id="description"
              name="description"
              defaultValue={event.description}
              minHeight="180px"
              placeholder="Key abstract, audience demographics, topics covered, or reception. Use toolbar buttons to format headings, bullet points, and emphasis..."
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={event.isFeatured}
                className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
              />
              <span className="text-xs text-zinc-300 font-medium">Feature on portfolio landing page</span>
            </label>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-zinc-700 bg-zinc-900 text-xs font-semibold">
                <Link href="/dashboard/events">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Update Event
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
