"use client";

import { useActionState, use } from "react";
import { submitContactAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, CheckCircle2, Mail, Send, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ContactPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "";

  const [state, formAction, isPending] = useActionState(submitContactAction, undefined);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link
        href={`/${handle}`}
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Overview</span>
      </Link>

      <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl overflow-hidden p-8 sm:p-10 py-8 gap-0 space-y-6">
        <CardHeader className="p-0 space-y-2">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
            <Mail className="h-6 w-6" style={{ color: "var(--theme-accent)" }} />
            <span>Send a Message</span>
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400 leading-relaxed">
            Have a question, consulting proposal, or speaking inquiry? Send a direct message below.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {state?.success ? (
            <div className="p-8 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-zinc-100">Message Delivered!</h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been received and stored in the recipient&apos;s inquiry inbox.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-2 text-xs border-zinc-700 bg-zinc-900 rounded-xl h-10 px-5">
                <Link href={`/${handle}`}>Return to Portfolio</Link>
              </Button>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              <input type="hidden" name="handle" value={handle} />

              {state?.error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{state.error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Your Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    required
                    className="h-11 pl-10 pr-4 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                    className="h-11 pl-10 pr-4 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Subject
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    defaultValue={defaultSubject}
                    placeholder="Project consultation inquiry"
                    className="h-11 pl-10 pr-4 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Share a brief overview of what you'd like to collaborate on..."
                  required
                  className="p-3.5 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500 resize-none leading-relaxed"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                style={{ backgroundColor: "var(--theme-accent)" }}
                className="w-full text-black font-semibold h-11 text-sm rounded-xl transition-all cursor-pointer shadow-lg hover:opacity-90 mt-2"
              >
                {isPending ? (
                  <span>Sending message...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <span>Send Inquiry</span>
                  </span>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
