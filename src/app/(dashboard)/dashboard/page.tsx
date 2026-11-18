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
    },
    {
      title: "Experiences",
      count: experiencesCount?.count || 0,
      icon: Briefcase,
      href: "/dashboard/experience",
      color: "text-emerald-400",
    },
    {
      title: "Achievements",
      count: achievementsCount?.count || 0,
      icon: Award,
      href: "/dashboard/achievements",
      color: "text-amber-400",
    },
    {
      title: "Services",
      count: servicesCount?.count || 0,
      icon: Sparkles,
      href: "/dashboard/services",
      color: "text-purple-400",
    },
    {
      title: "Events",
      count: eventsCount?.count || 0,
      icon: Calendar,
      href: "/dashboard/events",
      color: "text-rose-400",
    },
    {
      title: "Inquiries",
      count: inquiriesCount?.count || 0,
      icon: Mail,
      href: "/dashboard/inbox",
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Welcome, {user.name} 👋
            </h1>
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
              Active Portfolio
            </Badge>
          </div>
          <p className="text-sm text-zinc-400">
            Manage your multi-page portfolio content, customize your templates, and review visitor inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200">
            <Link href="/dashboard/theme">
              <Palette className="h-4 w-4 mr-2 text-purple-400" />
              Customize Theme
            </Link>
          </Button>

          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold">
            <a href={`/${user.handle}`} target="_blank" rel="noopener noreferrer">
              <span>View Live Portfolio</span>
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* Content Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href} className="group">
              <Card className="bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 transition-all p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-medium">{item.title}</span>
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="text-2xl font-bold text-zinc-100 mt-2">{item.count}</div>
                <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1 group-hover:text-emerald-400 transition-colors">
                  <span>Manage</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Portfolio Configuration & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900/60 border-zinc-800 text-zinc-100">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Portfolio Configuration</CardTitle>
            <CardDescription className="text-zinc-400">
              Current active template, color scheme, and typography settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/60 text-sm">
              <span className="text-zinc-400">Public URL</span>
              <span className="font-mono text-emerald-400">/{user.handle}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/60 text-sm">
              <span className="text-zinc-400">Active Layout</span>
              <Badge variant="secondary" className="capitalize bg-zinc-800 text-zinc-200">
                {user.settings?.templateId?.replace("_", " ") || "Simple Professional"}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/60 text-sm">
              <span className="text-zinc-400">Color Palette</span>
              <Badge variant="outline" className="capitalize border-zinc-700 text-zinc-300">
                {user.settings?.colorPalette || "Slate"}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-zinc-400">SEO Title</span>
              <span className="text-zinc-300 truncate max-w-[220px]">
                {user.settings?.seoTitle || `${user.name} — Portfolio`}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800 text-zinc-100">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            <CardDescription className="text-zinc-400">
              Quickly add new content or jump to key sections of your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline" className="border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 justify-start text-xs h-10">
              <Link href="/dashboard/articles">
                <Plus className="h-3.5 w-3.5 mr-2 text-blue-400" />
                Write Article
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 justify-start text-xs h-10">
              <Link href="/dashboard/experience">
                <Plus className="h-3.5 w-3.5 mr-2 text-emerald-400" />
                Add Experience
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 justify-start text-xs h-10">
              <Link href="/dashboard/services">
                <Plus className="h-3.5 w-3.5 mr-2 text-purple-400" />
                Offer New Service
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 justify-start text-xs h-10">
              <Link href="/dashboard/events">
                <Plus className="h-3.5 w-3.5 mr-2 text-rose-400" />
                Add Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
