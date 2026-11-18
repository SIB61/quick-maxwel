"use client";

import { useActionState } from "react";
import { updateAchievementAction } from "@/actions/achievements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Award, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Achievement } from "@/db/schema";

export default function EditAchievementForm({
  achievement,
}: {
  achievement: Achievement;
}) {
  const updateWithId = updateAchievementAction.bind(null, achievement.id);
  const [state, formAction, isPending] = useActionState(updateWithId, undefined);

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/dashboard/achievements"
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Achievements</span>
      </Link>

      <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl p-8 sm:p-10 py-8 gap-0 space-y-6">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Award className="h-6 w-6 text-amber-400" />
            <span>Edit Achievement</span>
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Updating &ldquo;{achievement.title}&rdquo;
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
                Honor / Certification Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                defaultValue={achievement.title}
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="issuer" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Issuing Organization
              </Label>
              <Input
                id="issuer"
                name="issuer"
                type="text"
                defaultValue={achievement.issuer}
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="issueDate" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Issue Date / Year
              </Label>
              <Input
                id="issueDate"
                name="issueDate"
                type="text"
                defaultValue={achievement.issueDate || ""}
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="credentialUrl" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Verification / Credential URL
              </Label>
              <Input
                id="credentialUrl"
                name="credentialUrl"
                type="url"
                defaultValue={achievement.credentialUrl || ""}
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Brief Description
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={achievement.description || ""}
              className="p-3.5 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 focus-visible:ring-emerald-500/40 resize-y leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={achievement.isFeatured}
                className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
              />
              <span className="text-xs text-zinc-300 font-medium">Feature in portfolio highlights</span>
            </label>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-zinc-700 bg-zinc-900 text-xs font-semibold">
                <Link href="/dashboard/achievements">Cancel</Link>
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
