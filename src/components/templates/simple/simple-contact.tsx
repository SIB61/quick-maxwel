"use client";

import { useActionState } from "react";
import { submitContactAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowLeft, CheckCircle2, Mail, Send, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function SimpleContact({ handle }: { handle: string }) {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "";
  const [state, formAction, isPending] = useActionState(submitContactAction, undefined);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans text-zinc-100">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Resume Overview</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <Mail className="h-7 w-7" style={{ color: "var(--theme-accent)" }} />
          <span>Get in Touch &amp; Direct Inquiries</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          Send a direct message regarding engineering leadership roles, consulting engagements, technical keynotes, or advisory work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form (Spans 2 cols) */}
        <div className="md:col-span-2 p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-lg space-y-6">
          {state?.success ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Message Dispatched Successfully</h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Your inquiry has been logged directly to @{handle}&apos;s verified inbox.
                </p>
              </div>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              <input type="hidden" name="handle" value={handle} />

              {state?.error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{state.error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderName" className="text-xs font-semibold text-zinc-300">
                    Your Name *
                  </Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    required
                    placeholder="Jane Doe"
                    className="h-11 rounded-xl bg-zinc-950/70 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderEmail" className="text-xs font-semibold text-zinc-300">
                    Email Address *
                  </Label>
                  <Input
                    id="senderEmail"
                    name="senderEmail"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="h-11 rounded-xl bg-zinc-950/70 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs font-semibold text-zinc-300">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  defaultValue={defaultSubject}
                  placeholder="Engineering Leadership / Advisory Inquiry"
                  className="h-11 rounded-xl bg-zinc-950/70 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-semibold text-zinc-300">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Please outline the scope, timeline, and goals of your engagement..."
                  className="rounded-xl bg-zinc-950/70 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-1 resize-y"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-xl font-bold text-black transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                {isPending ? (
                  <span>Dispatching Inquiry...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Sidebar Info Cards */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <Clock className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
              <span>Response Expectation</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Inquiries are typically reviewed within 24 to 48 business hours. Urgent advisory requests can specify timeline constraints in the subject line.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <ShieldCheck className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
              <span>Direct &amp; Verified</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Messages are delivered straight to the portfolio owner&apos;s verified inbox without public exposition or third-party tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
