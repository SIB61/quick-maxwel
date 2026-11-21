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
  Zap,
  CheckCircle2,
  Compass,
  FolderKanban,
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export default function AuroraStudioTemplate({ portfolio }: { portfolio: PortfolioUser }) {
  const featuredArticles = portfolio.articles.filter((a) => a.isFeatured).slice(0, 4);
  const featuredExperiences = portfolio.experiences.filter((e) => e.isFeatured).slice(0, 4);
  const featuredAchievements = portfolio.achievements.filter((a) => a.isFeatured).slice(0, 3);
  const featuredServices = portfolio.services.filter((s) => s.isFeatured).slice(0, 3);
  const featuredProjects = portfolio.projects.filter((p) => p.isFeatured).slice(0, 3);
  const featuredEvents = portfolio.events.filter((e) => e.isFeatured).slice(0, 3);
  const socials = portfolio.socialLinks || {};

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24 lg:space-y-28 relative">
      {/* Background Spatial Aurora Lighting Flares */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[750px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle at 40% 40%, var(--theme-accent) 0%, #6366f1 40%, transparent 70%)`
        }}
      />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle, var(--theme-accent) 0%, #ec4899 50%, transparent 75%)`
        }}
      />

      {/* Hero: Spatial Glassmorphic Studio Header */}
      <section className="relative z-10 pt-4 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-6">
          {/* Subtle top light bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{
              background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
            }}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/60 border border-white/10 backdrop-blur-md text-xs font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--theme-accent)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--theme-accent)" }} />
              </span>
              <span>Available for Select Engagements</span>
            </div>

            {portfolio.location && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                <Compass className="h-3.5 w-3.5" style={{ color: "var(--theme-accent)" }} />
                <span>{portfolio.location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {portfolio.avatarUrl && (
              <div className="relative group shrink-0">
                <div
                  className="absolute -inset-1 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500"
                  style={{ background: `linear-gradient(135deg, var(--theme-accent), #8b5cf6)` }}
                />
                <img
                  src={portfolio.avatarUrl}
                  alt={portfolio.name}
                  className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-3xl object-cover border-2 border-white/20 shadow-2xl"
                />
              </div>
            )}

            <div className="space-y-3 flex-1">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                {portfolio.name}
              </h1>
              <p
                className="text-lg sm:text-xl font-medium tracking-tight leading-snug"
                style={{ color: "var(--theme-accent)" }}
              >
                {portfolio.headline}
              </p>
            </div>
          </div>

          {portfolio.bio && (
            <RichContentDisplay
              content={portfolio.bio}
              className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl pt-2 font-light"
            />
          )}

          {/* Social Glass Capsules */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/50 border border-white/10 hover:border-white/25 text-xs text-zinc-300 hover:text-white transition-all hover:scale-105 shadow-sm"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/50 border border-white/10 hover:border-white/25 text-xs text-zinc-300 hover:text-white transition-all hover:scale-105 shadow-sm"
              >
                <TwitterIcon className="h-3.5 w-3.5" />
                <span>Twitter / X</span>
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/50 border border-white/10 hover:border-white/25 text-xs text-zinc-300 hover:text-white transition-all hover:scale-105 shadow-sm"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
            {socials.website && (
              <a
                href={socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/50 border border-white/10 hover:border-white/25 text-xs text-zinc-300 hover:text-white transition-all hover:scale-105 shadow-sm"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Website</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects: Studio Works */}
      {featuredProjects.length > 0 && (
        <section className="space-y-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold" style={{ color: "var(--theme-accent)" }}>
                <FolderKanban className="h-4 w-4" />
                <span>Studio Works</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Projects</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/projects`}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <span>View all ({portfolio.projects.length})</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/${portfolio.handle}/projects/${project.slug}`}>
                <div className="rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col h-full overflow-hidden group">
                  {project.coverImageUrl && (
                    <img src={project.coverImageUrl} alt="" className="w-full aspect-[16/9] object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  )}
                  <div className="p-7 space-y-3 flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{project.timeline || project.role}</span>
                    <h3 className="font-extrabold text-lg text-white">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">{project.summary}</p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2.5 py-0.5 rounded-full text-[11px] bg-zinc-950/50 border border-white/10 text-zinc-300">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Services: Floating Studio Packages */}
      {featuredServices.length > 0 && (
        <section className="space-y-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold" style={{ color: "var(--theme-accent)" }}>
                <Sparkles className="h-4 w-4" />
                <span>Strategic Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Consulting & Advisory</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/services`}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <span>View all ({portfolio.services.length})</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Link key={service.id} href={`/${portfolio.handle}/services/${service.slug}`}>
                <div className="p-7 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between h-full space-y-6 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        {service.pricingType}
                      </span>
                      {service.price && (
                        <Badge
                          variant="outline"
                          className="font-mono text-xs font-bold px-3 py-1 rounded-full border-white/20 bg-zinc-950/60"
                          style={{ color: "var(--theme-accent)" }}
                        >
                          {service.price}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-extrabold text-lg text-white group-hover:text-white">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        {service.deliverables.slice(0, 2).map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--theme-accent)" }} />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold pt-3 border-t border-white/10" style={{ color: "var(--theme-accent)" }}>
                    <span>Explore Scope & Deliverables</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Writings: Spotlight Frosted Panels */}
      {featuredArticles.length > 0 && (
        <section className="space-y-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold" style={{ color: "var(--theme-accent)" }}>
                <Zap className="h-4 w-4" />
                <span>Engineering Perspectives</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Writings</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/articles`}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <span>See all ({portfolio.articles.length})</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Link key={article.id} href={`/${portfolio.handle}/articles/${article.slug}`}>
                <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl space-y-4 h-full flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {article.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-950/80 text-zinc-300 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="text-xs text-zinc-500 font-mono">{article.readTime}</span>
                    </div>

                    <h3 className="font-extrabold text-xl text-white group-hover:text-white transition-colors">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-xs sm:text-sm text-zinc-400 font-light line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold pt-3 border-t border-white/10" style={{ color: "var(--theme-accent)" }}>
                    <span>Read Publication</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Experience Highlights: Translucent Career Modules */}
      {featuredExperiences.length > 0 && (
        <section className="space-y-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold" style={{ color: "var(--theme-accent)" }}>
                <Briefcase className="h-4 w-4" />
                <span>Track Record</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Career Milestones</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/experience`}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <span>Full Timeline</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="p-7 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-lg text-white">{exp.role}</h3>
                    <div className="text-xs sm:text-sm font-semibold" style={{ color: "var(--theme-accent)" }}>
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <Badge variant="outline" className="border-white/10 text-zinc-400 text-xs px-3 py-1 rounded-full font-mono bg-zinc-950/60">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </Badge>
                </div>

                {exp.description && (
                  <RichContentDisplay content={exp.description} className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pt-1" />
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2.5 py-1 rounded-xl bg-zinc-950/80 text-zinc-300 border border-white/10 font-medium"
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

      {/* Accolades & Speaking: Frosted Glass Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {featuredAchievements.length > 0 && (
          <div className="p-7 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Honors & Accolades</span>
              </h3>
              <Link href={`/${portfolio.handle}/achievements`} className="text-xs text-zinc-400 hover:text-white">
                View all ({portfolio.achievements.length})
              </Link>
            </div>
            <div className="space-y-3">
              {featuredAchievements.map((ach) => (
                <div key={ach.id} className="p-4 rounded-2xl bg-zinc-950/50 border border-white/5 space-y-1">
                  <div className="font-bold text-sm text-zinc-100">{ach.title}</div>
                  <div className="text-xs text-zinc-400 font-mono">{ach.issuer} • {ach.issueDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {featuredEvents.length > 0 && (
          <div className="p-7 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-rose-400" />
                <span>Speaking Appearances</span>
              </h3>
              <Link href={`/${portfolio.handle}/events`} className="text-xs text-zinc-400 hover:text-white">
                View all ({portfolio.events.length})
              </Link>
            </div>
            <div className="space-y-3">
              {featuredEvents.map((evt) => (
                <Link key={evt.id} href={`/${portfolio.handle}/events/${evt.slug}`}>
                  <div className="p-4 rounded-2xl bg-zinc-950/50 border border-white/5 hover:border-white/20 space-y-1 transition-colors">
                    <div className="font-bold text-sm text-zinc-100">{evt.title}</div>
                    <div className="text-xs text-zinc-400 font-mono">{evt.date} • {evt.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spatial Call to Action Banner */}
      <section className="relative overflow-hidden p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900/60 via-zinc-900/30 to-zinc-950 border border-white/15 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--theme-accent)" }}
        />

        <div className="relative z-10 space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Initiate Collaboration
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            Ready to design or audit mission-critical distributed systems, explore strategic advisory, or coordinate a talk?
          </p>
          <div className="pt-3">
            <Link
              href={`/${portfolio.handle}/contact`}
              className="inline-flex items-center gap-2.5 text-black font-extrabold h-12 px-8 rounded-2xl text-sm transition-all hover:scale-105 shadow-2xl"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Mail className="h-4 w-4" />
              <span>Send Message</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
