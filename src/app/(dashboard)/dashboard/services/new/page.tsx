"use client";

import { useActionState, useState } from "react";
import { createServiceAction } from "@/actions/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Sparkles, Loader2, Save } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
  const [state, formAction, isPending] = useActionState(createServiceAction, undefined);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/dashboard/services"
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Services</span>
      </Link>

      <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl p-8 sm:p-10 py-8 gap-0 space-y-6">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span>Create New Service Offering</span>
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Define consultation packages, audits, engineering projects, or hourly advisory.
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
                Service Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Cloud Scalability Audit"
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
                placeholder="cloud-scalability-audit"
                required
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="pricingType" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Pricing Structure
              </Label>
              <select
                id="pricingType"
                name="pricingType"
                defaultValue="fixed"
                className="w-full h-11 px-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                <option value="fixed">Fixed Price</option>
                <option value="hourly">Hourly Rate</option>
                <option value="quote">Contact for Quote</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Display Price
              </Label>
              <Input
                id="price"
                name="price"
                type="text"
                placeholder="e.g. $2,500 / project or $200 / hr"
                className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="shortDescription" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Short Description (Card Summary)
            </Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              type="text"
              placeholder="1-2 sentences summarizing what this service achieves"
              required
              className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="deliverables" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Key Deliverables (One per line)
            </Label>
            <Textarea
              id="deliverables"
              name="deliverables"
              rows={4}
              placeholder="Architecture diagram & system map&#10;P99 latency & bottleneck report&#10;2-hour strategy debrief"
              className="p-3.5 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 resize-y leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fullDescription" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Detailed Scope & Methodology
            </Label>
            <Textarea
              id="fullDescription"
              name="fullDescription"
              rows={6}
              placeholder="Detailed explanation of the process, expectations, onboarding, and outcomes..."
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
              <span className="text-xs text-zinc-300 font-medium">Feature on portfolio landing page</span>
            </label>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-zinc-700 bg-zinc-900 text-xs font-semibold">
                <Link href="/dashboard/services">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Create Service
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
