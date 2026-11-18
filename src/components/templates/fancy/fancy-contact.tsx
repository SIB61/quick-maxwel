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

export function FancyContact({ handle }: { handle: string }) {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "";
  const [state, formAction, isPending] = useActionState(submitContactAction, undefined);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Background Flare */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Return to Overview */}
      <div className="relative z-10">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Creative Overview</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="rounded-3xl p-8 sm:p-12 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative z-10 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-accent)" }} />
            <span className="text-zinc-300">Connect with Creator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Send a Message
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            Have a project, advisory inquiry, or speaking opportunity? Let&apos;s build together.
          </p>
        </div>

        {state?.success ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Message Delivered</h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. Your dispatch has been logged in @{handle}&apos;s inquiry inbox.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href={`/${handle}`}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-black shadow-md inline-block transition-transform hover:scale-105"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Return to Portfolio
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
                placeholder="e.g. Maya Lin"
                required
                className="h-11 rounded-2xl bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
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
                placeholder="maya@domain.com"
                required
                className="h-11 rounded-2xl bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
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
                placeholder="Collaboration / Advisory inquiry"
                className="h-11 rounded-2xl bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
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
                placeholder="Tell me about your vision, timeline, scale, and questions..."
                rows={5}
                required
                className="rounded-2xl bg-zinc-950/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1 resize-y"
              />
            </div>

            {/* Submit CTA */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-full font-bold text-xs text-black transition-all hover:opacity-90 shadow-xl flex items-center justify-center gap-2"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              {isPending ? (
                <span>Sending Message...</span>
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
    </div>
  );
}
