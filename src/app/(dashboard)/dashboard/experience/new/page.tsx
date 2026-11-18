"use client";

import { useActionState, useState } from "react";
import { createExperienceAction } from "@/actions/experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Briefcase, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function NewExperiencePage() {
  const [state, formAction, isPending] = useActionState(createExperienceAction, undefined);
  const [isCurrent, setIsCurrent] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/dashboard/experience"
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Experience</span>
      </Link>

      <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl p-8 sm:p-10 py-8 gap-0 space-y-6">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Briefcase className="h-6 w-6 text-emerald-400" />
            <span>Add Work Experience</span>
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Record a company, role, responsibilities, and technologies used.
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
              <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Company / Organization
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="e.g. Stripe, Google, or Startup"
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Role / Title
              </Label>
              <Input
                id="role"
                name="role"
                type="text"
                placeholder="e.g. Senior Backend Engineer"
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="San Francisco, CA (or Remote)"
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="employmentType" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Employment Type
              </Label>
              <select
                id="employmentType"
                name="employmentType"
                defaultValue="Full-time"
                className="w-full h-11 px-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="startDate" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Start Date
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="text"
                placeholder="e.g. Jan 2023 or 2023-01"
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="endDate" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  End Date
                </Label>
                <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isCurrent"
                    checked={isCurrent}
                    onChange={(e) => setIsCurrent(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 h-3.5 w-3.5"
                  />
                  <span>I currently work here</span>
                </label>
              </div>
              <Input
                id="endDate"
                name="endDate"
                type="text"
                placeholder={isCurrent ? "Present" : "e.g. Dec 2024"}
                disabled={isCurrent}
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 disabled:opacity-40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="skills" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Skills / Technologies Used (comma separated)
            </Label>
            <Input
              id="skills"
              name="skills"
              type="text"
              placeholder="TypeScript, Next.js, Kubernetes, PostgreSQL"
              className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Description & Achievements
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Key responsibilities, architectural decisions, and platform impact..."
              className="p-3.5 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 resize-y leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
              />
              <span className="text-xs text-zinc-300 font-medium">Feature in portfolio highlights</span>
            </label>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-zinc-700 bg-zinc-900 text-xs font-semibold">
                <Link href="/dashboard/experience">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Position
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
