import { getPortfolioData } from "@/lib/portfolio-data";
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
} from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/icons";
import Link from "next/link";

export default async function PortfolioLandingPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  const featuredArticles = portfolio.articles.filter((a) => a.isFeatured).slice(0, 3);
  const featuredExperiences = portfolio.experiences.filter((e) => e.isFeatured).slice(0, 3);
  const featuredAchievements = portfolio.achievements.filter((a) => a.isFeatured).slice(0, 3);
  const featuredServices = portfolio.services.filter((s) => s.isFeatured).slice(0, 3);
  const featuredEvents = portfolio.events.filter((e) => e.isFeatured).slice(0, 3);

  const socials = portfolio.socialLinks || {};

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section */}
      <section className="space-y-8 pt-2">
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
          {portfolio.avatarUrl && (
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.name}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-2 border-zinc-800 shadow-2xl shrink-0"
            />
          )}
          <div className="space-y-3.5 flex-1">
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
                {portfolio.name}
              </h1>
              <p className="text-lg sm:text-xl text-emerald-400 font-medium">
                {portfolio.headline}
              </p>
            </div>

            {portfolio.location && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <MapPin className="h-3.5 w-3.5" />
                <span>{portfolio.location}</span>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
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
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
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
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
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
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="Personal Website"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {portfolio.bio && (
          <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-300 leading-relaxed text-sm sm:text-base">
            {portfolio.bio}
          </div>
        )}
      </section>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-400" />
                Featured Articles
              </h2>
              <p className="text-xs text-zinc-400">Thoughts, technical writeups, and architecture guides</p>
            </div>
            <Link
              href={`/${handle}/articles`}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>See all ({portfolio.articles.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Link key={article.id} href={`/${handle}/articles/${article.slug}`}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl py-6 gap-0 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {article.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                      <span className="text-[11px] text-zinc-500">{article.readTime}</span>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-zinc-100 line-clamp-2 hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs text-emerald-400 font-semibold gap-1">
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Services Section */}
      {featuredServices.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Featured Services
              </h2>
              <p className="text-xs text-zinc-400">Consulting, architecture audits, and engineering</p>
            </div>
            <Link
              href={`/${handle}/services`}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>See all ({portfolio.services.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredServices.map((service) => (
              <Link key={service.id} href={`/${handle}/services/${service.slug}`}>
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-6 sm:p-7 rounded-2xl h-full flex flex-col justify-between py-6 gap-0 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-base sm:text-lg text-zinc-100">{service.title}</h3>
                      {service.price && (
                        <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs px-2.5 py-0.5 shrink-0">
                          {service.price}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs text-emerald-400 font-semibold gap-1">
                    <span>View deliverables</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Experience Section */}
      {featuredExperiences.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-400" />
                Work Experience
              </h2>
              <p className="text-xs text-zinc-400">Career journey and leadership roles</p>
            </div>
            <Link
              href={`/${handle}/experience`}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>See all ({portfolio.experiences.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-zinc-100">{exp.role}</h3>
                    <div className="text-xs sm:text-sm text-emerald-400">{exp.company} • {exp.location}</div>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs border-zinc-700 text-zinc-400 px-2.5 py-0.5">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </Badge>
                </div>
                {exp.description && (
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
                    {exp.description}
                  </p>
                )}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
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

      {/* Featured Achievements & Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Achievements */}
        {featuredAchievements.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-zinc-100 flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-400" />
                Achievements
              </h3>
              <Link href={`/${handle}/achievements`} className="text-xs text-emerald-400 hover:underline font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {featuredAchievements.map((ach) => (
                <div key={ach.id} className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 space-y-1.5">
                  <div className="font-semibold text-sm text-zinc-100">{ach.title}</div>
                  <div className="text-xs text-zinc-400">{ach.issuer} • {ach.issueDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events */}
        {featuredEvents.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-zinc-100 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-rose-400" />
                Speaking & Events
              </h3>
              <Link href={`/${handle}/events`} className="text-xs text-emerald-400 hover:underline font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {featuredEvents.map((evt) => (
                <Link key={evt.id} href={`/${handle}/events/${evt.slug}`}>
                  <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700 space-y-1.5 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-zinc-100">{evt.title}</span>
                      <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-400 px-2">{evt.eventType}</Badge>
                    </div>
                    <div className="text-xs text-zinc-400">{evt.date} • {evt.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-50">Let&apos;s build something together</h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
          Have an architectural question, consulting project, or speaking invitation? Send a message directly.
        </p>
        <div className="pt-2">
          <Link
            href={`/${handle}/contact`}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-7 rounded-full text-sm transition-all shadow-lg shadow-emerald-500/10"
          >
            <Mail className="h-4 w-4" />
            <span>Send Direct Message</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
