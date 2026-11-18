"use client";

import { useActionState } from "react";
import { submitContactAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowLeft, CheckCircle2, Mail, Send, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function BentoContact({ handle }: { handle: string }) {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "";
  const [state, formAction, isPending] = useActionState(submitContactAction, undefined);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 text-zinc-100">
      {/* Return to Bento Overview */}
      <div>
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Bento Overview</span>
        </Link>
      </div>

      {/* Bento Layout Grid for Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Bento Column: Form Card (Spans 2 cols) */}
        <div className="md:col-span-2 rounded-3xl p-8 sm:p-10 bg-zinc-900/60 border border-zinc-800/80 shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center text-black font-bold"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                <Mail className="h-4 w-4" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Send a Direct Message
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Inquire about technical advisory, distributed systems design, or speaking opportunities.
            </p>
          </div>

          {state?.success ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Message Logged to Inbox</h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Your transmission was written to the inquiry queue for @{handle}.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={`/${handle}`}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-black shadow-md inline-block transition-transform hover:scale-105"
                  style={{ backgroundColor: "var(--theme-accent)" }}
                >
                  Back to Bento Home
                </Link>
              </div>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              <input type="hidden" name="handle" value={handle} />

              {state?.error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{state.error}</span>
                </div>
              )}

              {/* Sender Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-medium text-zinc-300">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Satoshi Nakamoto"
                  required
                  className="h-11 rounded-xl bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                />
              </div>

              {/* Sender Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@domain.com"
                  required
                  className="h-11 rounded-xl bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs font-medium text-zinc-300">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  defaultValue={defaultSubject}
                  placeholder="Consulting inquiry / Project collaboration"
                  className="h-11 rounded-xl bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-medium text-zinc-300">
                  Your Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, team, timeline, and goals..."
                  rows={5}
                  required
                  className="rounded-xl bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1 resize-y"
                />
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-xl font-bold text-xs text-black transition-all hover:opacity-90 shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                {isPending ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Right Bento Column: Side Info Tiles */}
        <div className="space-y-4">
          <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-2 shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Response Time
            </span>
            <div className="text-base font-bold text-white">Within 24 Hours</div>
            <p className="text-xs text-zinc-400">Messages are monitored daily during business hours.</p>
          </div>

          <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-2 shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Security
            </span>
            <div className="text-base font-bold text-white">TLS Encrypted</div>
            <p className="text-xs text-zinc-400">Direct server-side transmission to Postgres inbox.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
