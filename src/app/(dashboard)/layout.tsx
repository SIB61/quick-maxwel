import { requireAuth } from "@/lib/auth";
import { logoutAction } from "@/actions/auth";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Award,
  Sparkles,
  Calendar,
  Mail,
  Palette,
  ExternalLink,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Articles", href: "/dashboard/articles", icon: FileText },
    { label: "Experience", href: "/dashboard/experience", icon: Briefcase },
    { label: "Achievements", href: "/dashboard/achievements", icon: Award },
    { label: "Services", href: "/dashboard/services", icon: Sparkles },
    { label: "Events", href: "/dashboard/events", icon: Calendar },
    { label: "Inquiries", href: "/dashboard/inbox", icon: Mail },
    { label: "Templates & Themes", href: "/dashboard/theme", icon: Palette },
    { label: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-800/80 bg-zinc-900/50 flex flex-col shrink-0">
        <div className="h-16 px-6 border-b border-zinc-800/80 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              P
            </div>
            <span className="font-semibold tracking-tight text-base">
              Portfolio<span className="text-emerald-400">Builder</span>
            </span>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-zinc-800/80 bg-zinc-950/40">
          <div className="flex items-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover border border-zinc-700"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-semibold border border-zinc-700">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="overflow-hidden">
              <div className="font-medium text-sm text-zinc-200 truncate">{user.name}</div>
              <div className="text-xs text-zinc-400 font-mono truncate">@{user.handle}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <a
              href={`/${user.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 py-1.5 px-2 rounded-md transition-colors"
            >
              <span>View Portfolio</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 rounded-lg transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout section */}
        <div className="p-4 border-t border-zinc-800/80">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950">
        <header className="h-16 border-b border-zinc-800/80 px-6 flex items-center justify-between bg-zinc-950/70 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-zinc-800 text-zinc-400 text-xs">
              Dashboard
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/${user.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-zinc-100 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 py-1.5 px-3 rounded-md transition-colors"
            >
              <span>Live: /{user.handle}</span>
              <ExternalLink className="h-3 w-3 text-emerald-400" />
            </a>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
