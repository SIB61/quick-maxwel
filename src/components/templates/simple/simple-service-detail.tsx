import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SimpleServiceDetail({
  portfolio,
  service,
  handle,
}: {
  portfolio: PortfolioUser;
  service: NonNullable<PortfolioUser["services"][number]>;
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans text-zinc-100">
      {/* Back button */}
      <div>
        <Link
          href={`/${handle}/services`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Main Spec Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-lg space-y-8">
        <header className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {service.title}
            </h1>

            {service.price && (
              <Badge
                variant="outline"
                className="font-mono text-sm px-3.5 py-1 w-fit"
                style={{
                  borderColor: "var(--theme-accent)",
                  color: "var(--theme-accent)",
                }}
              >
                {service.price}
              </Badge>
            )}
          </div>

          <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">
            {service.shortDescription}
          </p>
        </header>

        {/* Detailed Description */}
        {service.fullDescription && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Scope of Work &amp; Execution
            </h2>
            <RichContentDisplay
              content={service.fullDescription}
              className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans"
            />
          </div>
        )}

        {/* Deliverables Checklist */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-zinc-800/60">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Package Deliverables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs sm:text-sm text-zinc-200"
                >
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: "var(--theme-accent)" }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-zinc-400">
            Ready to initiate this engagement? Submit an inquiry to discuss timeline and scope.
          </div>

          <Link
            href={`/${handle}/contact?subject=${encodeURIComponent(`Engagement Inquiry: ${service.title}`)}`}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-black inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            <Mail className="h-4 w-4" />
            <span>Initiate Engagement</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
