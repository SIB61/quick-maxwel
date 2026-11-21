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
  ArrowUpRight,
  ExternalLink,
  Globe,
  CornerDownRight,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";
import { SocialIcon } from "@/components/social-icon";
import { normalizeSocialLinks, SOCIAL_PLATFORM_MAP } from "@/lib/social-platforms";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export default function MinimalSwissTemplate({ portfolio }: { portfolio: PortfolioUser }) {
  const featuredArticles = portfolio.articles.filter((a) => a.isFeatured).slice(0, 4);
  const featuredExperiences = portfolio.experiences.filter((e) => e.isFeatured).slice(0, 4);
  const featuredAchievements = portfolio.achievements.filter((a) => a.isFeatured).slice(0, 3);
  const featuredServices = portfolio.services.filter((s) => s.isFeatured).slice(0, 3);
  const featuredProjects = portfolio.projects.filter((p) => p.isFeatured).slice(0, 4);
  const featuredEvents = portfolio.events.filter((e) => e.isFeatured).slice(0, 3);
  const socials = normalizeSocialLinks(portfolio.socialLinks);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24 lg:space-y-32 font-sans text-zinc-100">
      {/* 00: Swiss Editorial Hero */}
      <section className="space-y-10 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4 text-xs font-mono tracking-widest uppercase text-zinc-500">
          <span>ARCHIVAL FOLIO // VOL. 26</span>
          <span>EST. {new Date().getFullYear()}</span>
          <span>BASE: {portfolio.location || "GLOBAL"}</span>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="space-y-4 flex-1">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-zinc-50 uppercase">
                {portfolio.name}
              </h1>
              <p
                className="text-xl sm:text-2xl font-light tracking-tight max-w-2xl leading-snug"
                style={{ color: "var(--theme-accent)" }}
              >
                {portfolio.headline}
              </p>
            </div>

            {portfolio.avatarUrl && (
              <div className="shrink-0">
                <img
                  src={portfolio.avatarUrl}
                  alt={portfolio.name}
                  className="h-28 w-28 sm:h-36 sm:w-36 rounded-none border border-zinc-700 object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            )}
          </div>

          {portfolio.bio && (
            <RichContentDisplay
              content={portfolio.bio}
              className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl pt-2 font-light"
            />
          )}

          {/* Minimalist Meta Links */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-800/80 text-xs font-mono uppercase tracking-wider text-zinc-400">
            {socials.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                {...(link.url.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="hover:text-white inline-flex items-center gap-1 transition-colors group"
              >
                <span>{SOCIAL_PLATFORM_MAP[link.platform].short} / {SOCIAL_PLATFORM_MAP[link.platform].label.toUpperCase()}</span>
                <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 01: Selected Technical Essays */}
      {featuredArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b-2 border-zinc-100 pb-3">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">SECTION 01</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-50">
                Essays & Writings
              </h2>
            </div>
            <Link
              href={`/${portfolio.handle}/articles`}
              className="text-xs font-mono uppercase tracking-wider hover:underline flex items-center gap-1"
              style={{ color: "var(--theme-accent)" }}
            >
              <span>INDEX ({portfolio.articles.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-800">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/${portfolio.handle}/articles/${article.slug}`}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4 group transition-all"
              >
                <div className="space-y-2 md:max-w-2xl">
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                    <span>№ 0{index + 1}</span>
                    <span>//</span>
                    <span>{article.readTime}</span>
                    {article.tags?.slice(0, 2).map((t) => (
                      <span key={t} className="text-zinc-400">[{t}]</span>
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">
                  <span>{new Date(article.publishedAt).getFullYear()}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" style={{ color: "var(--theme-accent)" }} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 02: Career Record & Experience */}
      {featuredExperiences.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b-2 border-zinc-100 pb-3">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">SECTION 02</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-50">
                Career Record
              </h2>
            </div>
            <Link
              href={`/${portfolio.handle}/experience`}
              className="text-xs font-mono uppercase tracking-wider hover:underline flex items-center gap-1"
              style={{ color: "var(--theme-accent)" }}
            >
              <span>COMPLETE RECORD ({portfolio.experiences.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="border border-zinc-800 divide-y divide-zinc-800">
            {featuredExperiences.map((exp, idx) => (
              <div key={exp.id} className="p-6 sm:p-8 space-y-4 hover:bg-zinc-900/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-zinc-500">STAGE 0{idx + 1}</span>
                    <h3 className="text-xl font-bold text-zinc-100">{exp.role}</h3>
                    <div className="text-sm font-medium" style={{ color: "var(--theme-accent)" }}>
                      {exp.company} — {exp.location}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 self-start sm:self-auto px-3 py-1 bg-zinc-900 border border-zinc-800">
                    {exp.startDate} — {exp.endDate || "PRESENT"}
                  </div>
                </div>

                {exp.description && (
                  <RichContentDisplay
                    content={exp.description}
                    className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-3xl"
                  />
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 border border-zinc-800 text-zinc-400 uppercase"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Selected Works */}
      {featuredProjects.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b-2 border-zinc-100 pb-3">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">SELECTED WORKS</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-50">Projects</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/projects`}
              className="text-xs font-mono uppercase tracking-wider hover:underline flex items-center gap-1"
              style={{ color: "var(--theme-accent)" }}
            >
              <span>INDEX ({portfolio.projects.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-800">
            {featuredProjects.map((project, pIdx) => (
              <Link
                key={project.id}
                href={`/${portfolio.handle}/projects/${project.slug}`}
                className="grid grid-cols-12 gap-4 py-5 group"
              >
                <span className="col-span-2 sm:col-span-1 text-xs font-mono text-zinc-500 pt-1">0{pIdx + 1}</span>
                <div className="col-span-10 sm:col-span-8 space-y-1">
                  <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-100 group-hover:text-white">{project.title}</h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2">{project.summary}</p>
                </div>
                <span className="hidden sm:block col-span-3 text-right text-xs font-mono uppercase tracking-wider text-zinc-500 pt-1">
                  {project.timeline}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 03: Advisory & Engineering Services */}
      {featuredServices.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b-2 border-zinc-100 pb-3">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">SECTION 03</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-50">
                Specialized Services
              </h2>
            </div>
            <Link
              href={`/${portfolio.handle}/services`}
              className="text-xs font-mono uppercase tracking-wider hover:underline flex items-center gap-1"
              style={{ color: "var(--theme-accent)" }}
            >
              <span>SERVICES ({portfolio.services.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service, sIdx) => (
              <Link key={service.id} href={`/${portfolio.handle}/services/${service.slug}`}>
                <div className="p-6 sm:p-7 border border-zinc-800 hover:border-zinc-500 transition-all flex flex-col justify-between h-full space-y-6 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">SPEC // 0{sIdx + 1}</span>
                      {service.price && (
                        <span className="font-bold" style={{ color: "var(--theme-accent)" }}>
                          {service.price}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-100 group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-400 group-hover:text-white">
                    <span>READ SPECIFICATION</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 04: Honors & Public Speaking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {featuredAchievements.length > 0 && (
          <div className="space-y-4">
            <div className="border-b-2 border-zinc-100 pb-2 flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-tight text-zinc-100">
                04A // Honors & Accolades
              </span>
              <Link href={`/${portfolio.handle}/achievements`} className="text-xs font-mono text-zinc-500 hover:text-white">
                ALL ({portfolio.achievements.length})
              </Link>
            </div>
            <div className="divide-y divide-zinc-800/80">
              {featuredAchievements.map((ach) => (
                <div key={ach.id} className="py-3.5 space-y-1">
                  <div className="font-bold text-sm text-zinc-100">{ach.title}</div>
                  <div className="text-xs font-mono text-zinc-400">{ach.issuer} — {ach.issueDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {featuredEvents.length > 0 && (
          <div className="space-y-4">
            <div className="border-b-2 border-zinc-100 pb-2 flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-tight text-zinc-100">
                04B // Public Speaking
              </span>
              <Link href={`/${portfolio.handle}/events`} className="text-xs font-mono text-zinc-500 hover:text-white">
                SCHEDULE ({portfolio.events.length})
              </Link>
            </div>
            <div className="divide-y divide-zinc-800/80">
              {featuredEvents.map((evt) => (
                <Link key={evt.id} href={`/${portfolio.handle}/events/${evt.slug}`}>
                  <div className="py-3.5 space-y-1 group">
                    <div className="font-bold text-sm text-zinc-100 group-hover:text-white flex items-center justify-between">
                      <span>{evt.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-xs font-mono text-zinc-400">{evt.date} — {evt.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 05: Editorial Transmission / Contact */}
      <section className="border-t-2 border-zinc-100 pt-10 pb-4 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">SECTION 05 // TRANSMISSION</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-zinc-50">
            Start A Dialogue
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl font-light leading-relaxed">
            Direct communication channel for engineering audits, strategic advisory, or keynote speaking invitations.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href={`/${portfolio.handle}/contact`}
            className="inline-flex items-center gap-3 text-black font-extrabold h-12 px-8 text-xs font-mono uppercase tracking-widest transition-all hover:opacity-90 shadow-lg"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            <span>DISPATCH TRANSMISSION</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
