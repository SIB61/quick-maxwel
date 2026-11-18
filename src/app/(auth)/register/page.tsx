"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowRight, Lock, Mail, User, AtSign, Loader2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, undefined);
  const [handle, setHandle] = useState("");

  return (
    <Card className="bg-zinc-900/80 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Create your portfolio</CardTitle>
        <CardDescription className="text-zinc-400">
          Claim your custom handle and start organizing your multi-page showcase
        </CardDescription>
      </CardHeader>

      <form action={formAction}>
        <CardContent className="space-y-4">
          {state?.error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300 text-sm">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Alex Morgan"
                required
                className="pl-9 bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="handle" className="text-zinc-300 text-sm">Portfolio Handle</Label>
              <span className="text-xs text-zinc-400">
                URL: /{handle || "handle"}
              </span>
            </div>
            <div className="relative">
              <AtSign className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="handle"
                name="handle"
                type="text"
                placeholder="alexmorgan"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                required
                className="pl-9 bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 font-mono text-sm"
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
                placeholder="alex@example.com"
                required
                className="pl-9 bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300 text-sm">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                className="pl-9 bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 bg-transparent border-t-0 pt-2 pb-6">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 text-sm transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating your portfolio...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          <p className="text-xs text-center text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
