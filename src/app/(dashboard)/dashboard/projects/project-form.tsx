"use client";

import { useActionState, useState } from "react";
import { createProjectAction, updateProjectAction } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploadField } from "@/components/ui/file-upload-field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, FolderKanban, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import type { Project } from "@/db/schema";

const inputClass =
  "h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-sky-500/40";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-zinc-300";

export function ProjectForm({ project, userHandle }: { project?: Project; userHandle: string }) {
  const isEdit = Boolean(project);
  const action = project ? updateProjectAction.bind(null, project.id) : createProjectAction;
  const [state, formAction, isPending] = useActionState(action, undefined);

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  // New projects keep the slug in sync with the title until the slug is edited by hand.
  const [slugEdited, setSlugEdited] = useState(isEdit);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugEdited) setSlug(slugify(val));
  };

  return (
    <div className="w-full space-y-6">
      <Link
        href="/dashboard/projects"
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Projects</span>
      </Link>

      <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl p-8 sm:p-10 py-8 gap-0 space-y-6">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <FolderKanban className="h-6 w-6 text-emerald-400" />
            <span>{isEdit ? "Edit Project" : "Showcase a New Project"}</span>
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            {project
              ? <>Updating &ldquo;{project.title}&rdquo; (/{userHandle}/projects/{project.slug})</>
              : "Highlight products, open-source work, client builds, or side projects."}
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
              <Label htmlFor="title" className={labelClass}>Project Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Realtime Analytics Engine"
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug" className={labelClass}>URL Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(e) => {
                  const next = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
                  setSlug(next);
                  setSlugEdited(next !== "");
                }}
                placeholder="realtime-analytics-engine"
                required
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="role" className={labelClass}>Your Role</Label>
              <Input
                id="role"
                name="role"
                defaultValue={project?.role ?? ""}
                placeholder="e.g. Lead Engineer"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timeline" className={labelClass}>Timeline</Label>
              <Input
                id="timeline"
                name="timeline"
                defaultValue={project?.timeline ?? ""}
                placeholder="e.g. 2024 or Jan 2024 – Present"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="status" className={labelClass}>Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={project?.status ?? "completed"}
                className="w-full h-11 px-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="summary" className={labelClass}>Summary (Card Description)</Label>
            <Input
              id="summary"
              name="summary"
              defaultValue={project?.summary ?? ""}
              placeholder="1-2 sentences on what the project is and why it matters"
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="liveUrl" className={labelClass}>Live URL</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                defaultValue={project?.liveUrl ?? ""}
                placeholder="https://example.com"
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="repoUrl" className={labelClass}>Source Code URL</Label>
              <Input
                id="repoUrl"
                name="repoUrl"
                type="url"
                defaultValue={project?.repoUrl ?? ""}
                placeholder="https://github.com/you/project"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="coverImageUrl" className={labelClass}>Cover Image</Label>
            <FileUploadField
              id="coverImageUrl"
              name="coverImageUrl"
              folder="projects"
              defaultValue={project?.coverImageUrl}
              placeholder="https://… or upload an image"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="techStack" className={labelClass}>Tech Stack (Comma separated)</Label>
            <Input
              id="techStack"
              name="techStack"
              defaultValue={(project?.techStack ?? []).join(", ")}
              placeholder="Go, PostgreSQL, Kafka, Kubernetes"
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="highlights" className={labelClass}>Key Highlights (One per line)</Label>
            <Textarea
              id="highlights"
              name="highlights"
              rows={4}
              defaultValue={(project?.highlights ?? []).join("\n")}
              placeholder={"Processes 2M events/sec at p99 < 15ms\nCut infrastructure cost by 40%\n1.2k GitHub stars"}
              className="p-3.5 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-sky-500/40 resize-y leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className={labelClass}>Case Study (Visual Editor)</Label>
            <RichTextEditor
              id="description"
              name="description"
              defaultValue={project?.description}
              minHeight="240px"
              placeholder="The problem, your approach, architecture decisions, and the outcome..."
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={project?.isFeatured ?? false}
                className="rounded border-zinc-700 bg-zinc-900 text-sky-500 focus:ring-sky-500 h-4 w-4"
              />
              <span className="text-xs text-zinc-300 font-medium">Feature on portfolio landing page</span>
            </label>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-zinc-700 bg-zinc-900 text-xs font-semibold">
                <Link href="/dashboard/projects">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-semibold shadow-lg shadow-sky-500/10 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isEdit ? "Updating..." : "Creating..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {isEdit ? "Update Project" : "Create Project"}
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
