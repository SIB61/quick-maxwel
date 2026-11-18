import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalServiceDetail } from "../terminal/terminal-service-detail";
import { SwissServiceDetail } from "../swiss/swiss-service-detail";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";

export default function ServiceDetailPageDispatcher({
  portfolio,
  service,
  handle,
}: {
  portfolio: PortfolioUser;
  service: NonNullable<PortfolioUser["services"][number]>;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalServiceDetail portfolio={portfolio} service={service} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissServiceDetail portfolio={portfolio} service={service} handle={handle} />;
  }

  // Standard/Simple template fallback
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 w-full">
      <Link
        href={`/${handle}/services`}
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all services</span>
      </Link>

      <header className="space-y-4 pb-6 border-b border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
            {service.title}
          </h1>
          {service.price && (
            <Badge variant="outline" className="text-sm font-mono px-3 py-1 w-fit" style={{ color: "var(--theme-accent)", borderColor: "var(--theme-accent)" }}>
              {service.price}
            </Badge>
          )}
        </div>
        <p className="text-base text-zinc-300 leading-relaxed">
          {service.shortDescription}
        </p>
      </header>

      {/* Deliverables List */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="space-y-3 p-6 rounded-xl bg-zinc-900/40 border border-zinc-800">
          <h2 className="text-base font-bold text-zinc-100 uppercase tracking-wider text-xs">Included Deliverables</h2>
          <div className="grid grid-cols-1 gap-2 pt-2">
            {service.deliverables.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--theme-accent)" }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full Description */}
      {service.fullDescription && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-zinc-100">Scope &amp; Methodology</h2>
          <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
            {service.fullDescription}
          </div>
        </section>
      )}

      {/* CTA Box */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-zinc-100 text-base">Ready to get started?</h3>
          <p className="text-xs text-zinc-400">Reach out to discuss timeline, deliverables, and booking.</p>
        </div>
        <Link
          href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-black transition-all hover:opacity-90 shrink-0 flex items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          <Mail className="h-4 w-4" />
          <span>Inquire About Service</span>
        </Link>
      </div>
    </div>
  );
}
