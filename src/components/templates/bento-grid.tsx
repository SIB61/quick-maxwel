import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import {
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
  Radio,
  Clock,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";
import Link from "next/link";

export default function BentoGridTemplate({ portfolio }: { portfolio: PortfolioUser }) {
  const featuredArticles = portfolio.articles.filter((a) => a.isFeatured);
  const primaryArticle = featuredArticles[0] || portfolio.articles[0];

  const featuredExperiences = portfolio.experiences.filter((e) => e.isFeatured);
  const topExperiences = (featuredExperiences.length > 0 ? featuredExperiences : portfolio.experiences).slice(0, 2);

  const featuredAchievements = portfolio.achievements.filter((a) => a.isFeatured);
  const topAchievement = featuredAchievements[0] || portfolio.achievements[0];

  const featuredServices = portfolio.services.filter((s) => s.isFeatured);
  const primaryService = featuredServices[0] || portfolio.services[0];

  const featuredEvents = portfolio.events.filter((e) => e.isFeatured);
  const topEvent = featuredEvents[0] || portfolio.events[0];

  const socials = portfolio.socialLinks || {};

  // Extract all unique skills across experiences
  const allSkills = Array.from(
    new Set(portfolio.experiences.flatMap((e) => e.skills || []))
  ).slice(0, 14);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 4-column Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TILE 1: Main Profile & Bio (Spans 2 cols, 2 rows on large screens) */}
        <div className="lg:col-span-2 rounded-3xl p-7 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {portfolio.avatarUrl ? (
                <img
                  src={portfolio.avatarUrl}
                  alt={portfolio.name}
                  className="h-20 w-20 rounded-2xl object-cover border border-zinc-700 shadow-md shrink-0"
                />
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-zinc-800 flex items-center justify-center text-xl font-bold text-zinc-300">
                  {portfolio.name.charAt(0)}
                </div>
              )}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
                  {portfolio.name}
                </h1>
                <p className="text-sm font-semibold" style={{ color: "var(--theme-accent)" }}>
                  {portfolio.headline}
                </p>
                {portfolio.location && (
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{portfolio.location}</span>
                  </div>
                )}
              </div>
            </div>

            {portfolio.bio && (
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {portfolio.bio}
              </p>
            )}
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/60">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {socials.website && (
              <a
                href={socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
            <div className="ml-auto text-xs text-zinc-500 font-mono">
              @{portfolio.handle}
            </div>
          </div>
        </div>

        {/* TILE 2: Status & Availability (Spans 1 col) */}
        <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Status</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--theme-accent)" }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "var(--theme-accent)" }} />
              </span>
            </div>
            <h3 className="font-bold text-base text-zinc-100">
              Open to Select Opportunities
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Available for high-leverage architectural audits, advisories, and speaking engagements.
            </p>
          </div>

          <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono">Response time</span>
            <span className="font-bold text-zinc-200">&lt; 24h</span>
          </div>
        </div>

        {/* TILE 3: Quick Connect (Spans 1 col) */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-300">
              <Mail className="h-5 w-5" style={{ color: "var(--theme-accent)" }} />
            </div>
            <h3 className="font-bold text-base text-zinc-100">Send an Inquiry</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Have an architectural question or proposition?
            </p>
          </div>

          <Link
            href={`/${portfolio.handle}/contact`}
            className="w-full text-center text-xs font-semibold py-2.5 px-4 rounded-xl text-black transition-all hover:opacity-90 shadow-md"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            Open Contact Form
          </Link>
        </div>

        {/* TILE 4: Featured Writing Spotlight (Spans 2 cols) */}
        {primaryArticle && (
          <Link
            href={`/${portfolio.handle}/articles/${primaryArticle.slug}`}
            className="lg:col-span-2 rounded-3xl p-7 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Featured Article
                  </span>
                </div>
                <span className="text-xs text-zinc-500 font-mono">{primaryArticle.readTime}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                {primaryArticle.title}
              </h2>

              {primaryArticle.excerpt && (
                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                  {primaryArticle.excerpt}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
              <span className="text-xs text-zinc-500 font-mono">
                {portfolio.articles.length} articles published
              </span>
              <div className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--theme-accent)" }}>
                <span>Read article</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        )}

        {/* TILE 5: Featured Service Tile (Spans 2 cols) */}
        {primaryService && (
          <Link
            href={`/${portfolio.handle}/services/${primaryService.slug}`}
            className="lg:col-span-2 rounded-3xl p-7 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Consulting Offering
                  </span>
                </div>
                {primaryService.price && (
                  <Badge variant="outline" className="font-mono text-xs border-zinc-700 text-zinc-300">
                    {primaryService.price}
                  </Badge>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                {primaryService.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                {primaryService.shortDescription}
              </p>

              {primaryService.deliverables && primaryService.deliverables.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {primaryService.deliverables.slice(0, 2).map((d) => (
                    <span key={d} className="inline-flex items-center gap-1 text-[11px] text-zinc-300 bg-zinc-950/60 border border-zinc-800 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="h-3 w-3" style={{ color: "var(--theme-accent)" }} />
                      <span className="truncate max-w-[200px]">{d}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
              <span className="text-xs text-zinc-500 font-mono">
                {portfolio.services.length} services available
              </span>
              <div className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--theme-accent)" }}>
                <span>View deliverables</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        )}

        {/* TILE 6: Recent Experience Timeline (Spans 2 cols) */}
        {topExperiences.length > 0 && (
          <div className="lg:col-span-2 rounded-3xl p-7 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Experience Highlights
                  </span>
                </div>
                <Link
                  href={`/${portfolio.handle}/experience`}
                  className="text-xs hover:underline"
                  style={{ color: "var(--theme-accent)" }}
                >
                  View all ({portfolio.experiences.length})
                </Link>
              </div>

              <div className="space-y-3">
                {topExperiences.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-zinc-100">{exp.role}</span>
                      <span className="text-[11px] text-zinc-500 font-mono">{exp.startDate} — {exp.endDate || "Present"}</span>
                    </div>
                    <div className="text-xs text-zinc-400 font-medium">
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TILE 7: Accolades & Achievements (Spans 1 col) */}
        <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Honors</span>
              </div>
              <Badge variant="outline" className="border-amber-500/30 text-amber-400 text-xs font-mono">
                {portfolio.achievements.length} Total
              </Badge>
            </div>

            {topAchievement ? (
              <div className="space-y-1.5">
                <div className="font-bold text-sm text-zinc-100 line-clamp-2">{topAchievement.title}</div>
                <div className="text-xs text-zinc-400">{topAchievement.issuer} • {topAchievement.issueDate}</div>
              </div>
            ) : (
              <p className="text-xs text-zinc-500">No honors registered yet.</p>
            )}
          </div>

          <Link
            href={`/${portfolio.handle}/achievements`}
            className="text-xs font-semibold flex items-center gap-1 transition-colors"
            style={{ color: "var(--theme-accent)" }}
          >
            <span>Browse all awards</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* TILE 8: Speaking & Events (Spans 1 col) */}
        <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-rose-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Events</span>
              </div>
              <Badge variant="outline" className="border-rose-500/30 text-rose-400 text-xs font-mono">
                {portfolio.events.length} Talks
              </Badge>
            </div>

            {topEvent ? (
              <div className="space-y-1.5">
                <div className="font-bold text-sm text-zinc-100 line-clamp-2">{topEvent.title}</div>
                <div className="text-xs text-zinc-400">{topEvent.date} • {topEvent.location}</div>
              </div>
            ) : (
              <p className="text-xs text-zinc-500">No upcoming events.</p>
            )}
          </div>

          <Link
            href={`/${portfolio.handle}/events`}
            className="text-xs font-semibold flex items-center gap-1 transition-colors"
            style={{ color: "var(--theme-accent)" }}
          >
            <span>See schedule</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* TILE 9: Skills & Competencies Cloud (Spans 4 cols / Full width) */}
        {allSkills.length > 0 && (
          <div className="lg:col-span-4 rounded-3xl p-6 bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 shrink-0">
              <Layers className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
              <span>Core Stack & Domains</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
