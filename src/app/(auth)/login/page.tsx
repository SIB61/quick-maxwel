"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowRight, Lock, Mail, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <Card className="bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur rounded-2xl overflow-hidden py-0 gap-0">
      <CardHeader className="px-8 pt-8 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Creator Portal</span>
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-zinc-400 leading-relaxed">
          Enter your account credentials to access and manage your portfolio.
        </CardDescription>
      </CardHeader>

      <form action={formAction}>
        <CardContent className="px-8 py-3 space-y-5">
          {state?.error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{state.error}</span>
            </div>
          )}

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
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11 pl-10 pr-4 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-sky-500/40 focus-visible:border-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="h-11 pl-10 pr-4 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-sky-500/40 focus-visible:border-sky-500"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-8 pt-4 pb-8 flex flex-col gap-4 bg-transparent border-t-0">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-sky-500 hover:bg-sky-400 text-black font-semibold h-11 text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-sky-500/10"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In to Dashboard
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          <p className="text-xs text-center text-zinc-400">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="text-sky-400 hover:text-sky-300 hover:underline font-semibold transition-colors ml-1"
            >
              Create a free portfolio
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
