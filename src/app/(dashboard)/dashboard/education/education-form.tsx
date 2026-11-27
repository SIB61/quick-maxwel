"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, GraduationCap, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Education } from "@/db/schema";
import type { EducationActionState } from "@/actions/education";

const inputClass =
  "h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-sky-500/40";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-zinc-300";

type Action = (prev: EducationActionState | undefined, formData: FormData) => Promise<EducationActionState>;

export function EducationForm({ action, initial }: { action: Action; initial?: Education }) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [isCurrent, setIsCurrent] = useState(initial?.isCurrent ?? false);
  const editing = Boolean(initial);

  return (
    <div className="w-full space-y-6">
      <Link
        href="/dashboard/education"
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Education</span>
      </Link>

      <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl p-8 sm:p-10 py-8 gap-0 space-y-6">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <GraduationCap className="h-6 w-6 text-sky-400" />
            <span>{editing ? "Edit Education" : "Add Education"}</span>
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            {editing
              ? `Updating ${initial!.degree} at ${initial!.institution}`
              : "Record a school, university, bootcamp or certification program."}
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
              <Label htmlFor="institution" className={labelClass}>School / Institution</Label>
              <Input id="institution" name="institution" required defaultValue={initial?.institution} placeholder="e.g. Stanford University" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="degree" className={labelClass}>Degree / Qualification</Label>
              <Input id="degree" name="degree" required defaultValue={initial?.degree} placeholder="e.g. BSc, MSc, Diploma" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="fieldOfStudy" className={labelClass}>Field of Study</Label>
              <Input id="fieldOfStudy" name="fieldOfStudy" defaultValue={initial?.fieldOfStudy ?? ""} placeholder="e.g. Computer Science" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location" className={labelClass}>Location</Label>
              <Input id="location" name="location" defaultValue={initial?.location ?? ""} placeholder="e.g. Stanford, CA" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="startDate" className={labelClass}>Start Date</Label>
              <Input id="startDate" name="startDate" required defaultValue={initial?.startDate} placeholder="e.g. 2016-09 or 2016" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="endDate" className={labelClass}>End Date</Label>
                <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isCurrent"
                    checked={isCurrent}
                    onChange={(e) => setIsCurrent(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-900 text-sky-500 h-3.5 w-3.5"
                  />
                  <span>I&apos;m still studying here</span>
                </label>
              </div>
              <Input
                id="endDate"
                name="endDate"
                defaultValue={initial && !initial.isCurrent ? (initial.endDate ?? "") : ""}
                placeholder={isCurrent ? "Present" : "e.g. 2020-06 or 2020"}
                disabled={isCurrent}
                className={`${inputClass} disabled:opacity-40`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="grade" className={labelClass}>Grade / Honors (optional)</Label>
            <Input id="grade" name="grade" defaultValue={initial?.grade ?? ""} placeholder="e.g. 3.9 GPA, First Class Honours, Dean's List" className={inputClass} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className={labelClass}>Activities, Thesis & Highlights</Label>
            <RichTextEditor
              id="description"
              name="description"
              minHeight="160px"
              defaultValue={initial?.description ?? ""}
              placeholder="Thesis topic, societies, awards, notable coursework…"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={initial?.isFeatured}
                className="rounded border-zinc-700 bg-zinc-900 text-sky-500 focus:ring-sky-500 h-4 w-4"
              />
              <span className="text-xs text-zinc-300 font-medium">Feature in portfolio highlights</span>
            </label>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-zinc-700 bg-zinc-900 text-xs font-semibold">
                <Link href="/dashboard/education">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-semibold shadow-lg shadow-sky-500/10 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Saving...</span>
                ) : (
                  <span className="flex items-center gap-2"><Save className="h-4 w-4" />Save Education</span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
