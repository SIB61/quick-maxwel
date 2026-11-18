"use client";

import { useActionState } from "react";
import { submitContactAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Terminal as TerminalIcon, CheckCircle2, AlertCircle, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function TerminalContact({ handle }: { handle: string }) {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "";
  const [state, formAction, isPending] = useActionState(submitContactAction, undefined);

  return (
    <div className="max-w-2xl mx-auto space-y-6 font-mono text-xs sm:text-sm px-4 py-8">
      {/* Breadcrumb command */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd ..</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">./contact.sh --interactive</span>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: ./contact.sh --stdin</span>
          </div>
          <span className="text-zinc-500 text-[11px]">TCP/IP INBOX SOCKET</span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <TerminalIcon className="h-4 w-4" />
              <span className="font-bold">INCOMING_TRANSMISSION_PROTOCOL</span>
            </div>
            <p className="text-zinc-400 text-xs">
              Direct telemetry socket to recipient @{handle}. Fill fields and execute dispatch.
            </p>
          </div>

          {state?.success ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-zinc-100 text-base">200 OK: PACKET DELIVERED</h3>
                <p className="text-xs text-zinc-300">
                  Message written to socket and verified in database inbox.
                </p>
              </div>
              <Button asChild variant="outline" className="text-xs font-mono border-zinc-700 bg-zinc-900 rounded-xl h-11 px-6">
                <Link href={`/${handle}`}>:wq (return to home)</Link>
              </Button>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              <input type="hidden" name="handle" value={handle} />

              {state?.error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>STDERR: {state.error}</span>
                </div>
              )}

              {/* Sender Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-zinc-400 text-xs font-mono flex items-center gap-1">
                  <span style={{ color: "var(--theme-accent)" }}>&gt;</span>
                  <span>INPUT: sender_name</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Linus Torvalds"
                  required
                  className="h-11 rounded-xl bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs focus-visible:ring-1"
                />
              </div>

              {/* Sender Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-zinc-400 text-xs font-mono flex items-center gap-1">
                  <span style={{ color: "var(--theme-accent)" }}>&gt;</span>
                  <span>INPUT: sender_email</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@domain.com"
                  required
                  className="h-11 rounded-xl bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs focus-visible:ring-1"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-zinc-400 text-xs font-mono flex items-center gap-1">
                  <span style={{ color: "var(--theme-accent)" }}>&gt;</span>
                  <span>INPUT: payload_subject</span>
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  defaultValue={defaultSubject}
                  placeholder="Project advisory inquiry"
                  className="h-11 rounded-xl bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs focus-visible:ring-1"
                />
              </div>

              {/* Message Payload */}
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-zinc-400 text-xs font-mono flex items-center gap-1">
                  <span style={{ color: "var(--theme-accent)" }}>&gt;</span>
                  <span>INPUT: payload_body</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type transmission payload here..."
                  rows={5}
                  required
                  className="rounded-xl bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs focus-visible:ring-1 resize-y"
                />
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-xl font-bold font-mono text-xs text-black transition-all hover:opacity-90 shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                {isPending ? (
                  <span>DISPATCHING VIA TCP...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>EXECUTE ./dispatch --now</span>
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-zinc-800/80 text-zinc-500 text-[11px] flex items-center justify-between">
            <span>Buffer mode: AUTO_FLUSH</span>
            <span className="text-emerald-400 font-bold">[LISTENING]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
