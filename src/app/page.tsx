import { db } from "@/db";
import { users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Sparkles, Layers, Palette, Terminal, CheckCircle2, ArrowRight, UserPlus, LogIn, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  let dbStatus = "Connected";
  let demoUser = null;
  const session = await getSession();

  try {
    demoUser = await db.query.users.findFirst({
      with: {
        settings: true,
        articles: true,
        experiences: true,
        achievements: true,
        services: true,
        events: true,
      },
    });
  } catch (error) {
    dbStatus = "Connection Error";
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Navigation Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              P
            </div>
            <span className="font-semibold tracking-tight text-lg">Portfolio<span className="text-emerald-400">Builder</span></span>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs py-0.5">
              v0.2.0 • Phase 2 Ready
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 border border-zinc-800 rounded-full px-3 py-1 bg-zinc-900/60">
              <span className={`h-2 w-2 rounded-full ${dbStatus === "Connected" ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`} />
              <span>PostgreSQL: <strong className="text-zinc-200">{dbStatus}</strong></span>
            </div>

            {session ? (
              <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs">
                <Link href="/dashboard">
                  <span>Dashboard (@{session.handle})</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800">
                  <Link href="/login">
                    <LogIn className="h-3.5 w-3.5 mr-1" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs">
                  <Link href="/register">
                    <UserPlus className="h-3.5 w-3.5 mr-1" />
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center">
        <div className="space-y-6 max-w-3xl">
          <Badge className="bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700 font-mono text-xs">
            Next.js 16 • PostgreSQL • Drizzle ORM • shadcn/ui • Multi-Tenant Routing
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-100">
            Build and publish your custom multi-page portfolio.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
            Manage your articles, career timeline, achievements, services, and events all in one place with a dedicated admin dashboard and multiple stunning presentation layouts.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-6">
              <Link href="/register">
                <span>Claim Your Portfolio Handle</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>

            {demoUser && (
              <Button asChild variant="outline" size="lg" className="border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 h-11 px-6">
                <Link href={`/${demoUser.handle}`}>
                  <span>View Live Demo (@{demoUser.handle})</span>
                  <ExternalLink className="h-4 w-4 ml-2 text-emerald-400" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Live Demo Showcase Card */}
        {demoUser && (
          <div className="mt-12">
            <Card className="bg-zinc-900/70 border-zinc-800 text-zinc-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <CardTitle className="text-lg font-semibold">Live Multi-Tenant Public Portfolio</CardTitle>
                  </div>
                  <Button asChild size="sm" variant="outline" className="border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-xs text-emerald-400">
                    <Link href={`/${demoUser.handle}`}>
                      <span>Visit /{demoUser.handle}</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
                <CardDescription className="text-zinc-400">
                  Dynamic multi-page public routes are live: overview, articles, experience, achievements, services, events, and contact form.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  <Link href={`/${demoUser.handle}/articles`} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center hover:border-zinc-700 transition-colors">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.articles.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Articles →</div>
                  </Link>
                  <Link href={`/${demoUser.handle}/experience`} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center hover:border-zinc-700 transition-colors">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.experiences.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Experiences →</div>
                  </Link>
                  <Link href={`/${demoUser.handle}/achievements`} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center hover:border-zinc-700 transition-colors">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.achievements.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Achievements →</div>
                  </Link>
                  <Link href={`/${demoUser.handle}/services`} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center hover:border-zinc-700 transition-colors">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.services.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Services →</div>
                  </Link>
                  <Link href={`/${demoUser.handle}/events`} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center hover:border-zinc-700 transition-colors">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.events.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Events →</div>
                  </Link>
                  <Link href={`/${demoUser.handle}/contact`} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center hover:border-zinc-700 transition-colors">
                    <div className="text-xs font-semibold text-emerald-400">Direct Form</div>
                    <div className="text-xs text-zinc-400 mt-1">Contact Page →</div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Workflow Roadmap Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-zinc-900/40 border-emerald-500/30">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Workflow 1 (Completed)
              </div>
              <CardTitle className="text-base text-zinc-100">Scaffolding & Database</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400">
              Next.js 16, PostgreSQL 16 container, Drizzle ORM schema, migrations, and seed data.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/40 border-emerald-500/30">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Workflow 2 (Completed)
              </div>
              <CardTitle className="text-base text-zinc-100">Auth & Multi-Tenancy</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400">
              Session-based auth (register, login, middleware), admin dashboard layout, and multi-page <code className="text-zinc-300">/[handle]</code> routing.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                <Palette className="h-4 w-4" />
                Workflow 3 (Next)
              </div>
              <CardTitle className="text-base text-zinc-100">CRUD Management</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400">
              Admin forms for creating, editing, and toggling featured items for articles, experiences, services, and events.
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 px-6 text-center text-xs text-zinc-500">
        Portfolio Builder • Local Dev Server running on port 3000
      </footer>
    </div>
  );
}
