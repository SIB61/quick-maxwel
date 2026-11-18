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
  ChevronRight,
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export default function SimpleProfessionalTemplate({ portfolio }: { portfolio: PortfolioUser }) {
  const featuredArticles = portfolio.articles.filter((a) => a.isFeatured).slice(0, 3);
  const featuredExperiences = portfolio.experiences.filter((e) => e.isFeatured).slice(0, 4);
  const featuredAchievements = portfolio.achievements.filter((a) => a.isFeatured).slice(0, 3);
  const featuredServices = portfolio.services.filter((s) => s.isFeatured).slice(0, 2);
  const featuredEvents = portfolio.events.filter((e) => e.isFeatured).slice(0, 3);
  const socials = portfolio.socialLinks || {};

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 lg:space-y-20">
      {/* Editorial Minimal Hero */}
      <section className="space-y-6 pt-4 border-b border-zinc-800/60 pb-12">
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
          {portfolio.avatarUrl && (
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.name}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border border-zinc-700/80 shadow-md shrink-0"
            />
          )}
          <div className="space-y-3 flex-1">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
                  {portfolio.name}
                </h1>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-[11px] px-2.5 py-0.5">
                  Available
                </Badge>
              </div>
              <p className="text-lg sm:text-xl font-medium" style={{ color: "var(--theme-accent)" }}>
                {portfolio.headline}
              </p>
            </div>

            {portfolio.location && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                <span>{portfolio.location}</span>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-1">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              )}
              {socials.website && (
                <a
                  href={socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="Personal Website"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {portfolio.bio && (
          <div className="pt-2">
            <RichContentDisplay content={portfolio.bio} className="text-zinc-300 leading-relaxed text-sm sm:text-base font-sans" />
          </div>
        )}
      </section>

      {/* Structured Resume Timeline for Experience */}
      {featuredExperiences.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
              <Briefcase className="h-5 w-5" style={{ color: "var(--theme-accent)" }} />
              <span>Career & Experience</span>
            </h2>
            <Link
              href={`/${portfolio.handle}/experience`}
              className="text-xs font-semibold flex items-center gap-1 transition-colors hover:underline"
              style={{ color: "var(--theme-accent)" }}
            >
              <span>View All ({portfolio.experiences.length})</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
            {featuredExperiences.map((exp) => (
              <div key={exp.id} className="relative space-y-2 group">
                {/* Timeline node bullet */}
                <div
                  className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-zinc-950 border-2 transition-transform group-hover:scale-125"
                  style={{ borderColor: "var(--theme-accent)" }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-base text-zinc-100">{exp.role}</h3>
                    <div className="text-xs sm:text-sm text-zinc-400 font-medium">
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs border-zinc-800 text-zinc-400 font-mono">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </Badge>
                </div>

                {exp.description && (
                  <RichContentDisplay content={exp.description} className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1" />
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono"
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

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
              <FileText className="h-5 w-5" style={{ color: "var(--theme-accent)" }} />
              <span>Selected Writings</span>
            </h2>
            <Link
              href={`/${portfolio.handle}/articles`}
              className="text-xs font-semibold flex items-center gap-1 transition-colors hover:underline"
              style={{ color: "var(--theme-accent)" }}
            >
              <span>View All ({portfolio.articles.length})</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/${portfolio.handle}/articles/${article.slug}`}
                className="py-5 block group space-y-2 hover:pl-2 transition-all duration-200"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-zinc-500 font-mono">{article.readTime}</span>
                  {article.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-zinc-900 border border-zinc-800 text-[10px] px-2 text-zinc-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-zinc-100 group-hover:text-white transition-colors">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
              <Sparkles className="h-5 w-5" style={{ color: "var(--theme-accent)" }} />
              <span>Consulting & Services</span>
            </h2>
            <Link
              href={`/${portfolio.handle}/services`}
              className="text-xs font-semibold flex items-center gap-1 transition-colors hover:underline"
              style={{ color: "var(--theme-accent)" }}
            >
              <span>View All ({portfolio.services.length})</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredServices.map((service) => (
              <Link key={service.id} href={`/${portfolio.handle}/services/${service.slug}`}>
                <Card className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all p-6 rounded-2xl h-full flex flex-col justify-between py-6 gap-0 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-zinc-100">{service.title}</h3>
                      {service.price && (
                        <span className="text-xs font-mono font-semibold" style={{ color: "var(--theme-accent)" }}>
                          {service.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="text-xs font-semibold flex items-center gap-1 pt-2" style={{ color: "var(--theme-accent)" }}>
                    <span>Scope of Work</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Achievements & Speaking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {featuredAchievements.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
              <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
                <Award className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
                <span>Honors & Awards</span>
              </h3>
              <Link href={`/${portfolio.handle}/achievements`} className="text-xs text-zinc-400 hover:text-zinc-200">
                All
              </Link>
            </div>
            <div className="space-y-3">
              {featuredAchievements.map((ach) => (
                <div key={ach.id} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
                  <div className="font-semibold text-xs sm:text-sm text-zinc-100">{ach.title}</div>
                  <div className="text-xs text-zinc-500">{ach.issuer} • {ach.issueDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {featuredEvents.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
              <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
                <Calendar className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
                <span>Speaking</span>
              </h3>
              <Link href={`/${portfolio.handle}/events`} className="text-xs text-zinc-400 hover:text-zinc-200">
                All
              </Link>
            </div>
            <div className="space-y-3">
              {featuredEvents.map((evt) => (
                <Link key={evt.id} href={`/${portfolio.handle}/events/${evt.slug}`}>
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 space-y-1 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-xs sm:text-sm text-zinc-100">{evt.title}</span>
                      <span className="text-[10px] text-zinc-500">{evt.date}</span>
                    </div>
                    <div className="text-xs text-zinc-500">{evt.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Direct Contact Banner */}
      <section className="p-8 sm:p-10 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">Get in touch</h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
          Interested in working together or discussing an engineering opportunity?
        </p>
        <div className="pt-2">
          <Link
            href={`/${portfolio.handle}/contact`}
            className="inline-flex items-center gap-2 text-black font-semibold h-10 px-6 rounded-xl text-xs transition-all shadow-md"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Send Direct Message</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
