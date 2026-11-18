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
    <div className="max-w-xl mx-auto space-y-8">
      <Link
        href={`/${handle}`}
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Overview</span>
      </Link>

      <Card className="bg-zinc-900/70 border-zinc-800 text-zinc-100 shadow-xl backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Mail className="h-5 w-5 text-emerald-400" />
            <span>Send a Message</span>
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Have a question, consulting proposal, or speaking inquiry? Fill out the form below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {state?.success ? (
            <div className="p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-lg text-zinc-100">Message Delivered!</h3>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                Thank you for reaching out. Your message has been received and stored in the user&apos;s inquiry inbox.
              </p>
              <Button asChild variant="outline" className="mt-2 text-xs border-zinc-700 bg-zinc-900">
                <Link href={`/${handle}`}>Return to Portfolio</Link>
              </Button>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="handle" value={handle} />

              {state?.error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{state.error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300 text-sm">Your Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    required
                    className="pl-9 bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300 text-sm">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                    className="pl-9 bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-zinc-300 text-sm">Subject</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    defaultValue={defaultSubject}
                    placeholder="Project consultation inquiry"
                    className="pl-9 bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-zinc-300 text-sm">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Share a brief overview of what you'd like to collaborate on..."
                  required
                  className="bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-10 transition-all cursor-pointer"
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
