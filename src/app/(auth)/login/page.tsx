"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowRight, Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <Card className="bg-zinc-900/80 border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-zinc-400">
          Enter your email and password to access your portfolio dashboard
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
            <Label htmlFor="email" className="text-zinc-300 text-sm">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="sarah@example.com"
                required
                defaultValue="sarah@example.com"
                className="pl-9 bg-zinc-950/70 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-zinc-300 text-sm">Password</Label>
              <span className="text-xs text-zinc-500">Default demo: password123</span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                defaultValue="password123"
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
            <Link href="/register" className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold transition-colors">
              Create a free portfolio
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
