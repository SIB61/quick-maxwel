import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
  Sparkle,
  Zap,
  FolderKanban,
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";
import { SocialIcon } from "@/components/social-icon";
import { normalizeSocialLinks, SOCIAL_PLATFORM_MAP } from "@/lib/social-platforms";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export default function FancyCreativeTemplate({ portfolio }: { portfolio: PortfolioUser }) {
  const featuredArticles = portfolio.articles.filter((a) => a.isFeatured).slice(0, 3);
  const featuredExperiences = portfolio.experiences.filter((e) => e.isFeatured).slice(0, 3);
  const featuredAchievements = portfolio.achievements.filter((a) => a.isFeatured).slice(0, 3);
  const featuredServices = portfolio.services.filter((s) => s.isFeatured).slice(0, 3);
  const featuredProjects = portfolio.projects.filter((p) => p.isFeatured).slice(0, 4);
  const featuredEvents = portfolio.events.filter((e) => e.isFeatured).slice(0, 3);
  const socials = normalizeSocialLinks(portfolio.socialLinks);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 lg:space-y-20 relative">
      {/* Decorative ambient gradient backdrop */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Hero Section with Glassmorphism & Gradient Typography */}
      <section className="relative z-10 pt-4 space-y-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {portfolio.avatarUrl && (
            <div className="relative group shrink-0">
              <div
                className="absolute -inset-1 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500"
                style={{ background: "linear-gradient(135deg, var(--theme-accent), transparent)" }}
              />
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.name}
                className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-3xl object-cover border-2 border-zinc-700/80 shadow-2xl"
              />
            </div>
          )}

          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur text-xs font-semibold">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-accent)" }} />
              <span className="text-zinc-300">Available for innovative work</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-50">
                Hi, I&apos;m{" "}
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-200 to-[var(--theme-accent)]"
                >
                  {portfolio.name}
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-zinc-300 max-w-2xl leading-snug">
                {portfolio.headline}
              </p>
            </div>

            {portfolio.location && (
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-zinc-400">
                <MapPin className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
                <span>{portfolio.location}</span>
              </div>
            )}

            {/* Social pills */}
            <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 flex-wrap">
              {socials.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  {...(link.url.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-zinc-100 transition-all hover:scale-105 shadow-lg backdrop-blur"
                  aria-label={SOCIAL_PLATFORM_MAP[link.platform].label}
                  title={SOCIAL_PLATFORM_MAP[link.platform].label}
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {portfolio.bio && (
          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900/70 via-zinc-900/40 to-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl shadow-xl">
            <RichContentDisplay content={portfolio.bio} className="text-zinc-300 text-sm sm:text-base leading-relaxed" />
          </div>
        )}
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold" style={{ color: "var(--theme-accent)" }}>
                <FolderKanban className="h-4 w-4" />
                <span>Recent Work</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">Featured Projects</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/projects`}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 flex items-center gap-1.5 transition-all"
            >
              <span>See all work</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/${portfolio.handle}/projects/${project.slug}`}>
                <div className="group relative rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden bg-zinc-950">
                    {project.coverImageUrl ? (
                      <img src={project.coverImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-5xl font-black text-zinc-800" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--theme-accent) 25%, transparent), transparent 70%)" }}>
                        {project.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-7 space-y-2">
                    <h3 className="font-extrabold text-lg text-zinc-100 group-hover:text-white">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">{project.summary}</p>
                    <div className="flex items-center gap-1.5 text-xs font-bold pt-2" style={{ color: "var(--theme-accent)" }}>
                      <span>View project</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Services with Glowing Price Tags */}
      {featuredServices.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold" style={{ color: "var(--theme-accent)" }}>
                <Sparkles className="h-4 w-4" />
                <span>Specialized Offerings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">Consulting & Packages</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/services`}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 flex items-center gap-1.5 transition-all"
            >
              <span>Explore all</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Link key={service.id} href={`/${portfolio.handle}/services/${service.slug}`}>
                <div className="group relative rounded-3xl p-6 sm:p-7 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        {service.pricingType}
                      </span>
                      {service.price && (
                        <Badge
                          variant="outline"
                          className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            borderColor: "var(--theme-accent)",
                            color: "var(--theme-accent)",
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                          }}
                        >
                          {service.price}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-extrabold text-lg text-zinc-100 group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold pt-2" style={{ color: "var(--theme-accent)" }}>
                    <span>See deliverables</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Articles with Card Highlights */}
      {featuredArticles.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold" style={{ color: "var(--theme-accent)" }}>
                <Zap className="h-4 w-4" />
                <span>Publications & Insights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">Featured Articles</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/articles`}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 flex items-center gap-1.5 transition-all"
            >
              <span>Read all</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Link key={article.id} href={`/${portfolio.handle}/articles/${article.slug}`}>
                <div className="group rounded-3xl p-7 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {article.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs text-zinc-500 font-mono">{article.readTime}</span>
                    </div>

                    <h3 className="font-extrabold text-xl text-zinc-100 group-hover:text-white transition-colors">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold pt-2" style={{ color: "var(--theme-accent)" }}>
                    <span>Read complete essay</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Experience Tree with Neon Bullets */}
      {featuredExperiences.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold" style={{ color: "var(--theme-accent)" }}>
                <Briefcase className="h-4 w-4" />
                <span>Track Record</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">Professional Journey</h2>
            </div>
            <Link
              href={`/${portfolio.handle}/experience`}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 flex items-center gap-1.5 transition-all"
            >
              <span>Full timeline</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-lg text-zinc-100">{exp.role}</h3>
                    <div className="text-xs sm:text-sm font-semibold" style={{ color: "var(--theme-accent)" }}>
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs px-3 py-1 rounded-full font-mono">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </Badge>
                </div>
                {exp.description && (
                  <RichContentDisplay content={exp.description} className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1" />
                )}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2.5 py-1 rounded-xl bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* High-Impact Contact Banner with Accent Glow */}
      <section className="relative overflow-hidden p-6 sm:p-10 md:p-14 rounded-3xl bg-zinc-900/90 border border-zinc-800 text-center space-y-5 shadow-2xl">
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: "var(--theme-accent)" }}
        />

        <div className="relative z-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-50">
            Let&apos;s build the future together.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Ready to kick off a new initiative, need strategic architecture advice, or want to invite me to speak?
          </p>
          <div className="pt-3">
            <Link
              href={`/${portfolio.handle}/contact`}
              className="inline-flex items-center gap-2 text-black font-extrabold h-12 px-8 rounded-2xl text-sm transition-all hover:scale-105 shadow-xl"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Mail className="h-4 w-4" />
              <span>Get in Touch Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
