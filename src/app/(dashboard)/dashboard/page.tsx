import { requireAuth } from "@/lib/auth";
import { db } from "@/db";
import { articles, experiences, achievements, services, events, contacts } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Briefcase,
  Award,
  Sparkles,
  Calendar,
  Mail,
  Palette,
  ExternalLink,
  Plus,
  ArrowUpRight,
  Sparkle,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardOverviewPage() {
  const user = await requireAuth();

  // Query counts for this user in parallel
  const [
    [articlesCount],
    [experiencesCount],
    [achievementsCount],
    [servicesCount],
    [eventsCount],
    [inquiriesCount],
  ] = await Promise.all([
    db.select({ count: count() }).from(articles).where(eq(articles.userId, user.id)),
    db.select({ count: count() }).from(experiences).where(eq(experiences.userId, user.id)),
    db.select({ count: count() }).from(achievements).where(eq(achievements.userId, user.id)),
    db.select({ count: count() }).from(services).where(eq(services.userId, user.id)),
    db.select({ count: count() }).from(events).where(eq(events.userId, user.id)),
    db.select({ count: count() }).from(contacts).where(eq(contacts.userId, user.id)),
  ]);

  const stats = [
    {
      title: "Articles",
      count: articlesCount?.count || 0,
      icon: FileText,
      href: "/dashboard/articles",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Experience",
      count: experiencesCount?.count || 0,
      icon: Briefcase,
      href: "/dashboard/experience",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Achievements",
      count: achievementsCount?.count || 0,
      icon: Award,
      href: "/dashboard/achievements",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Services",
      count: servicesCount?.count || 0,
      icon: Sparkles,
      href: "/dashboard/services",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Events",
      count: eventsCount?.count || 0,
      icon: Calendar,
      href: "/dashboard/events",
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      title: "Inquiries",
      count: inquiriesCount?.count || 0,
      icon: Mail,
      href: "/dashboard/inbox",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
  ];

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Welcome Hero Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-xs py-0.5 px-2.5 font-medium">
                Portfolio Active
              </Badge>
              <span className="text-xs font-mono text-zinc-500">/{user.handle}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-50">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Organize your career achievements, write articles, offer consulting services, and tailor your multi-page showcase.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 text-sm font-semibold transition-all">
              <Link href="/dashboard/theme">
                <Palette className="h-4 w-4 mr-2 text-purple-400" />
                Theme Studio
              </Link>
            </Button>

            <Button asChild className="h-11 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition-all shadow-lg shadow-emerald-500/10">
              <a href={`/${user.handle}`} target="_blank" rel="noopener noreferrer">
                <span>View Live Portfolio</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Metrics Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Portfolio Content Overview
          </h2>
          <span className="text-xs text-zinc-500 font-mono">6 Categories Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="group block">
                <Card className="h-full bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 transition-all p-5 rounded-2xl flex flex-col justify-between py-5 gap-0">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl border ${item.bg}`}>
                      <Icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="text-3xl font-extrabold text-zinc-50 tracking-tight">{item.count}</div>
                    <div className="text-xs text-zinc-400 font-medium">{item.title}</div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Portfolio Configuration & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900/60 border-zinc-800 text-zinc-100 rounded-2xl p-7 py-7 gap-0">
          <CardHeader className="p-0 pb-6 space-y-1.5">
            <CardTitle className="text-lg font-bold">Portfolio Settings</CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Active template layout and color system.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-3.5">
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-800/60 text-sm">
              <span className="text-zinc-400 text-xs">Public Address</span>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                /{user.handle}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-800/60 text-sm">
              <span className="text-zinc-400 text-xs">Active Template</span>
              <Badge variant="secondary" className="capitalize bg-zinc-800 text-zinc-200 text-xs">
                {user.settings?.templateId?.replace("_", " ") || "Simple Professional"}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-800/60 text-sm">
              <span className="text-zinc-400 text-xs">Color Scheme</span>
              <Badge variant="outline" className="capitalize border-zinc-700 text-zinc-300 text-xs">
                {user.settings?.colorPalette || "Slate"}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-zinc-400 text-xs">SEO Title</span>
              <span className="text-xs text-zinc-300 truncate max-w-[220px]">
                {user.settings?.seoTitle || `${user.name} — Portfolio`}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800 text-zinc-100 rounded-2xl p-7 py-7 gap-0">
          <CardHeader className="p-0 pb-6 space-y-1.5">
            <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Directly jump into drafting or updating items.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-2 gap-3.5">
            <Button asChild variant="outline" className="h-11 rounded-xl border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 justify-start text-xs font-semibold px-4">
              <Link href="/dashboard/articles">
                <Plus className="h-4 w-4 mr-2 text-blue-400" />
                Write Article
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 justify-start text-xs font-semibold px-4">
              <Link href="/dashboard/experience">
                <Plus className="h-4 w-4 mr-2 text-emerald-400" />
                Add Experience
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 justify-start text-xs font-semibold px-4">
              <Link href="/dashboard/services">
                <Plus className="h-4 w-4 mr-2 text-purple-400" />
                Add Service
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-xl border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 justify-start text-xs font-semibold px-4">
              <Link href="/dashboard/events">
                <Plus className="h-4 w-4 mr-2 text-rose-400" />
                Add Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
