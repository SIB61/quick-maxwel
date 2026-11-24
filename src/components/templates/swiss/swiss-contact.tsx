"use client";

import { useActionState } from "react";
import { submitContactAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function SwissContact({ handle }: { handle: string }) {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") || "";
  const [state, formAction, isPending] = useActionState(submitContactAction, undefined);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
      {/* Swiss Return Bar */}
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-zinc-500">
        <Link
          href={`/${handle}`}
          className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>RETURN TO OVERVIEW</span>
        </Link>
        <span>TRANSMISSION PROTOCOL // INBOX</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
          INITIATE TRANSMISSION
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl">
          Direct communication protocol to @{handle}. Fill the specification manifest below to deliver your inquiry.
        </p>
      </div>

      {state?.success ? (
        <div className="border border-white p-8 sm:p-12 space-y-6 text-center">
          <div className="text-xs font-mono tracking-widest uppercase text-zinc-400">
            TRANSMISSION VERIFIED // STATUS 200 OK
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            TRANSMISSION RECORDED IN RECIPIENT INBOX
          </h2>
          <p className="text-sm text-zinc-400 font-light max-w-md mx-auto">
            Your dispatch has been successfully stored. Expect an archival response shortly.
          </p>
          <div className="pt-4">
            <Link
              href={`/${handle}`}
              className="border border-white px-8 py-3 text-xs font-mono uppercase tracking-widest text-zinc-950 bg-white hover:bg-zinc-200 transition-all font-bold inline-block"
            >
              RETURN TO FOLIO
            </Link>
          </div>
        </div>
      ) : (
        <form action={formAction} className="border border-zinc-800 p-8 sm:p-12 space-y-8">
          <input type="hidden" name="handle" value={handle} />

          {state?.error && (
            <div className="border border-red-500/50 p-4 text-xs font-mono uppercase text-red-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>TRANSMISSION ERROR: {state.error}</span>
            </div>
          )}

          {/* Sender Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              TRANSMISSION // SENDER NAME *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Josef Müller-Brockmann"
              required
              className="h-11 rounded-none bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-sans text-sm focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white"
            />
          </div>

          {/* Sender Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              TRANSMISSION // ROUTE (EMAIL) *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@archival.ch"
              required
              className="h-11 rounded-none bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-sans text-sm focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white"
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              TRANSMISSION // DISPATCH SUBJECT
            </Label>
            <Input
              id="subject"
              name="subject"
              defaultValue={defaultSubject}
              placeholder="Engineering advisory / Keynote inquiry"
              className="h-11 rounded-none bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-sans text-sm focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              TRANSMISSION // PAYLOAD *
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Specify requirements, parameters, timeline, and scope..."
              rows={6}
              required
              className="rounded-none bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-sans text-sm focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white resize-y"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 rounded-none text-xs font-mono uppercase tracking-widest text-zinc-950 bg-white hover:bg-zinc-200 transition-all font-bold flex items-center justify-center gap-2"
          >
            {isPending ? (
              <span>DISPATCHING TRANSMISSION...</span>
            ) : (
              <>
                <span>DISPATCH TRANSMISSION</span>
                <ArrowUpRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
