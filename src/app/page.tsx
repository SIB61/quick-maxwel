import { db } from "@/db";
import { users } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Sparkles, Layers, Palette, Terminal, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";


export default async function HomePage() {
  let dbStatus = "Connected";
  let demoUser = null;

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
              v0.1.0 • Phase 1 Ready
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400 border border-zinc-800 rounded-full px-3 py-1 bg-zinc-900/60">
              <span className={`h-2 w-2 rounded-full ${dbStatus === "Connected" ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`} />
              <span>PostgreSQL: <strong className="text-zinc-200">{dbStatus}</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 flex flex-col justify-center">
        <div className="space-y-6 max-w-3xl">
          <Badge className="bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700 font-mono text-xs">
            Next.js 16 • PostgreSQL • Drizzle ORM • shadcn/ui • Docker
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-100">
            Create stunning, multi-page personal portfolios.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
            A developer-first platform for building customizable multi-page portfolios with rich articles, experiences, services, events, and multiple aesthetic templates.
          </p>
        </div>

        {/* Live Seeded User Status Card */}
        {demoUser && (
          <div className="mt-12">
            <Card className="bg-zinc-900/70 border-zinc-800 text-zinc-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <CardTitle className="text-lg font-semibold">Workflow 1 Seed Data Live Verification</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                    Handle: @{demoUser.handle}
                  </Badge>
                </div>
                <CardDescription className="text-zinc-400">
                  Data queried live via Drizzle ORM from the Docker PostgreSQL container.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.articles.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Articles</div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.experiences.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Experiences</div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.achievements.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Achievements</div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.services.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Services</div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{demoUser.events.length}</div>
                    <div className="text-xs text-zinc-400 mt-1">Events</div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 text-center">
                    <div className="text-xs font-semibold text-zinc-300 capitalize">{demoUser.settings?.templateId?.replace("_", " ") || "Default"}</div>
                    <div className="text-xs text-zinc-400 mt-1">Active Template</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-zinc-950/40 border border-zinc-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {demoUser.avatarUrl && (
                      <img
                        src={demoUser.avatarUrl}
                        alt={demoUser.name}
                        className="h-11 w-11 rounded-full object-cover border border-zinc-700"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-sm text-zinc-200">{demoUser.name}</div>
                      <div className="text-xs text-zinc-400">{demoUser.headline}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-zinc-400 border-zinc-700 text-xs">
                      Theme: {demoUser.settings?.colorPalette}
                    </Badge>
                  </div>
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
              Next.js 16 Turbopack, PostgreSQL container on port 5434, Drizzle ORM schema, and live seed verification.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                <Layers className="h-4 w-4" />
                Workflow 2 (Next)
              </div>
              <CardTitle className="text-base text-zinc-100">Auth & Multi-Tenancy</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400">
              Secure authentication, session cookies, route isolation, and dynamic <code className="text-zinc-300">/[handle]</code> portfolio rendering.
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/40 border-zinc-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                <Palette className="h-4 w-4" />
                Workflow 3 - 5
              </div>
              <CardTitle className="text-base text-zinc-100">Dashboard & Templates</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400">
              Interactive admin CRUD forms and 3 distinct portfolio templates (Simple Professional, Fancy Creative, Bento Grid).
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
