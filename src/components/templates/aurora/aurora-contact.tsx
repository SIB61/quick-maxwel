"use client";

import { useActionState } from "react";
import { submitContactAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowLeft, CheckCircle2, Mail, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function AuroraContact({ handle }: { handle: string }) {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "";
  const [state, formAction, isPending] = useActionState(submitContactAction, undefined);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Background Aurora Flare */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle, var(--theme-accent) 0%, #8b5cf6 50%, transparent 80%)`,
        }}
      />

      {/* Return to Overview */}
      <div className="relative z-10">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/40 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Studio Overview</span>
        </Link>
      </div>

      {/* Spatial Frosted Form Container */}
      <div className="rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden relative z-10">
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
          }}
        />

        <div className="p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-white/10 text-xs text-zinc-300">
              <Sparkles className="h-3 w-3" style={{ color: "var(--theme-accent)" }} />
              <span>Direct Studio Inquiry</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Initiate a Project
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              Have a technical inquiry, advisory proposal, or keynote opportunity? Send a transmission below.
            </p>
          </div>

          {state?.success ? (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 mx-auto" style={{ color: "var(--theme-accent)" }} />
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Transmission Delivered</h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for connecting. Your message has been received and logged in @{handle}&apos;s studio inbox.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={`/${handle}`}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-black shadow-md inline-block transition-transform hover:scale-105"
                  style={{ backgroundColor: "var(--theme-accent)" }}
                >
                  Return to Studio
                </Link>
              </div>
            </div>
          ) : (
            <form action={formAction} className="space-y-6">
              <input type="hidden" name="handle" value={handle} />

              {state?.error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{state.error}</span>
                </div>
              )}

              {/* Sender Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium text-zinc-300">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Marc Andreessen"
                  required
                  className="h-11 rounded-2xl bg-zinc-950/60 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                />
              </div>

              {/* Sender Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@domain.com"
                  required
                  className="h-11 rounded-2xl bg-zinc-950/60 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs font-medium text-zinc-300">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  defaultValue={defaultSubject}
                  placeholder="Consulting inquiry / Keynote invitation"
                  className="h-11 rounded-2xl bg-zinc-950/60 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-medium text-zinc-300">
                  Your Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe your goals, team scale, timeline, and questions..."
                  rows={5}
                  required
                  className="rounded-2xl bg-zinc-950/60 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1 resize-y"
                />
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-full font-bold text-xs text-black transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                {isPending ? (
                  <span>Dispatching Spatial Packet...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Transmission</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
