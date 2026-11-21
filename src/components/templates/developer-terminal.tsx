"use client";

import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import {
  Terminal as TerminalIcon,
  Folder,
  FileCode,
  FileText,
  Briefcase,
  Award,
  Sparkles,
  Calendar,
  Mail,
  MapPin,
  ArrowRight,
  ExternalLink,
  Globe,
  CornerDownRight,
  Copy,
  Check,
  CheckCircle2,
  FolderKanban,
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";
import { SocialIcon } from "@/components/social-icon";
import { normalizeSocialLinks, SOCIAL_PLATFORM_MAP } from "@/lib/social-platforms";
import Link from "next/link";
import { useState } from "react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

type TabId = "all" | "articles" | "experience" | "projects" | "services" | "events";

export default function DeveloperTerminalTemplate({ portfolio }: { portfolio: PortfolioUser }) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [copied, setCopied] = useState(false);

  const featuredArticles = portfolio.articles.filter((a) => a.isFeatured).slice(0, 4);
  const featuredExperiences = portfolio.experiences.filter((e) => e.isFeatured).slice(0, 4);
  const featuredAchievements = portfolio.achievements.filter((a) => a.isFeatured).slice(0, 3);
  const featuredServices = portfolio.services.filter((s) => s.isFeatured).slice(0, 3);
  const featuredProjects = portfolio.projects.filter((p) => p.isFeatured).slice(0, 4);
  const featuredEvents = portfolio.events.filter((e) => e.isFeatured).slice(0, 3);

  const socials = normalizeSocialLinks(portfolio.socialLinks);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(`ssh ${portfolio.handle}@portfolio.dev`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-mono text-xs sm:text-sm">
      {/* Window Container */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Terminal Header Bar */}
        <div className="h-11 px-4 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
            <span className="ml-2 text-xs text-zinc-400 font-mono hidden sm:inline">
              {portfolio.handle}@archlinux: ~/portfolio (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-500 font-mono">UTF-8</span>
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center overflow-x-auto border-b border-zinc-800/80 bg-zinc-950/60 px-2 text-xs">
          {[
            { id: "all", label: "00_overview.sh", icon: TerminalIcon },
            { id: "articles", label: "01_writings.md", icon: FileText },
            { id: "experience", label: "02_career.log", icon: Briefcase },
            { id: "projects", label: "03_projects/", icon: FolderKanban },
            { id: "services", label: "04_services.json", icon: Sparkles },
            { id: "events", label: "05_events.sh", icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 text-xs whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "text-zinc-100 border-[var(--theme-accent)] bg-zinc-900/40"
                    : "text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/20"
                }`}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: isActive ? "var(--theme-accent)" : undefined }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Terminal Main Body */}
        <div className="p-6 sm:p-8 space-y-10 leading-relaxed text-zinc-300">
          {/* Section: Whoami & Profile Summary */}
          {(activeTab === "all" || activeTab === "experience") && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <span style={{ color: "var(--theme-accent)" }}>➜</span>
                <span className="text-cyan-400">~</span>
                <span className="text-zinc-100">whoami --profile --detailed</span>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-5">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {portfolio.avatarUrl && (
                    <img
                      src={portfolio.avatarUrl}
                      alt={portfolio.name}
                      className="h-20 w-20 rounded-xl object-cover border border-zinc-700 shadow-md shrink-0"
                    />
                  )}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-lg text-zinc-100">{portfolio.name}</span>
                      <span className="text-xs text-zinc-500 font-mono">(@{portfolio.handle})</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono"
                        style={{ color: "var(--theme-accent)", borderColor: "var(--theme-accent)" }}
                      >
                        STATUS: 200 READY
                      </Badge>
                    </div>

                    <p className="text-sm font-semibold" style={{ color: "var(--theme-accent)" }}>
                      {portfolio.headline}
                    </p>

                    {portfolio.location && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-0.5">
                        <MapPin className="h-3 w-3 text-zinc-500" />
                        <span>{portfolio.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {portfolio.bio && (
                  <div className="pt-2 border-t border-zinc-800/60 text-xs text-zinc-300 leading-relaxed">
                    <span className="text-zinc-500 font-mono"># Bio</span>
                    <div className="mt-1">
                      <RichContentDisplay content={portfolio.bio} className="font-mono text-xs text-zinc-300 leading-relaxed" />
                    </div>
                  </div>
                )}

                {/* Social execution row */}
                <div className="pt-2 border-t border-zinc-800/60 flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="text-zinc-500">Links:</span>
                  {socials.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      {...(link.url.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                    >
                      <SocialIcon platform={link.platform} className="h-3 w-3" />
                      <span>{link.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section: Writings / Articles */}
          {(activeTab === "all" || activeTab === "articles") && featuredArticles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--theme-accent)" }}>➜</span>
                  <span className="text-cyan-400">~/writings</span>
                  <span className="text-zinc-100">ls -lh --sort=time</span>
                </div>
                <Link
                  href={`/${portfolio.handle}/articles`}
                  className="text-xs hover:underline flex items-center gap-1"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>all ({portfolio.articles.length})</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-2">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${portfolio.handle}/articles/${article.slug}`}
                    className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 block transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileCode className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-white" />
                        <span className="font-bold text-sm text-zinc-100 group-hover:text-white">
                          {article.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500 shrink-0">
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{new Date(article.publishedAt).toISOString().split("T")[0]}</span>
                      </div>
                    </div>
                    {article.excerpt && (
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-1 pl-6">
                        {article.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section: Career & Experience */}
          {(activeTab === "all" || activeTab === "experience") && featuredExperiences.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--theme-accent)" }}>➜</span>
                  <span className="text-cyan-400">~/career</span>
                  <span className="text-zinc-100">git log --oneline --graph</span>
                </div>
                <Link
                  href={`/${portfolio.handle}/experience`}
                  className="text-xs hover:underline flex items-center gap-1"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>view all</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {featuredExperiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-2 relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-zinc-500">[{index + 1}]</span>
                        <span className="font-bold text-sm text-zinc-100">{exp.role}</span>
                        <span className="text-xs" style={{ color: "var(--theme-accent)" }}>
                          @{exp.company}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">
                        {exp.startDate} - {exp.endDate || "HEAD"}
                      </span>
                    </div>

                    {exp.description && (
                      <div className="pl-6">
                        <RichContentDisplay content={exp.description} className="font-mono text-xs text-zinc-400 leading-relaxed" />
                      </div>
                    )}

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pl-6 pt-1">
                        {exp.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Projects */}
          {(activeTab === "all" || activeTab === "projects") && featuredProjects.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--theme-accent)" }}>➜</span>
                  <span className="text-cyan-400">~/projects</span>
                  <span className="text-zinc-100">ls -la</span>
                </div>
                <Link
                  href={`/${portfolio.handle}/projects`}
                  className="text-xs hover:underline flex items-center gap-1"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>all projects</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredProjects.map((project) => (
                  <Link key={project.id} href={`/${portfolio.handle}/projects/${project.slug}`}>
                    <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all space-y-3 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm text-zinc-100">./{project.slug}</span>
                          <span className="text-[11px] font-mono text-zinc-500">[{project.status}]</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{project.summary}</p>
                        {project.techStack && project.techStack.length > 0 && (
                          <p className="text-[11px] text-zinc-500">
                            stack: <span style={{ color: "var(--theme-accent)" }}>{project.techStack.join(", ")}</span>
                          </p>
                        )}
                      </div>
                      <div className="text-xs font-semibold flex items-center gap-1 pt-1" style={{ color: "var(--theme-accent)" }}>
                        <span>cat README.md</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section: Services & Consulting */}
          {(activeTab === "all" || activeTab === "services") && featuredServices.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--theme-accent)" }}>➜</span>
                  <span className="text-cyan-400">~/services</span>
                  <span className="text-zinc-100">cat services.json | jq .</span>
                </div>
                <Link
                  href={`/${portfolio.handle}/services`}
                  className="text-xs hover:underline flex items-center gap-1"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>all services</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredServices.map((service) => (
                  <Link key={service.id} href={`/${portfolio.handle}/services/${service.slug}`}>
                    <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all space-y-3 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-zinc-100">{service.title}</span>
                          {service.price && (
                            <span className="text-xs font-mono font-bold" style={{ color: "var(--theme-accent)" }}>
                              {service.price}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>

                      <div className="text-xs font-semibold flex items-center gap-1 pt-1" style={{ color: "var(--theme-accent)" }}>
                        <span>Inspect manifest</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section: Accolades & Events */}
          {(activeTab === "all" || activeTab === "events") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {featuredAchievements.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span style={{ color: "var(--theme-accent)" }}>➜</span>
                    <span className="text-zinc-200">./accolades.sh</span>
                  </div>
                  <div className="space-y-2">
                    {featuredAchievements.map((ach) => (
                      <div key={ach.id} className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 text-xs">
                        <div className="font-bold text-zinc-200">{ach.title}</div>
                        <div className="text-[11px] text-zinc-500">{ach.issuer} • {ach.issueDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {featuredEvents.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span style={{ color: "var(--theme-accent)" }}>➜</span>
                    <span className="text-zinc-200">./events.sh</span>
                  </div>
                  <div className="space-y-2">
                    {featuredEvents.map((evt) => (
                      <Link key={evt.id} href={`/${portfolio.handle}/events/${evt.slug}`}>
                        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 text-xs space-y-1 transition-colors">
                          <div className="font-bold text-zinc-200">{evt.title}</div>
                          <div className="text-[11px] text-zinc-500">{evt.date} • {evt.location}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interactive Shell Prompt Footer */}
          <div className="pt-6 border-t border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-zinc-400">
              <span style={{ color: "var(--theme-accent)" }}>➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-zinc-100">./contact.sh --message &quot;Hello&quot;</span>
              <span className="inline-block w-2 h-4 bg-zinc-400 animate-pulse" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs text-zinc-500 font-mono">
                Ready to collaborate or discuss an architectural opportunity?
              </div>
              <Link
                href={`/${portfolio.handle}/contact`}
                className="text-center text-xs font-bold py-2.5 px-5 rounded-xl text-black transition-all hover:opacity-90 shadow-md"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Execute ./contact.sh
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
