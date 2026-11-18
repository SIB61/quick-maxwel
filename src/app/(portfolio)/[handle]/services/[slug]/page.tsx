import { getPortfolioData } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>;
}) {
  const { handle, slug } = await params;
  const portfolio = await getPortfolioData(handle);

  const service = portfolio.services.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
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
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-sm px-3 py-1 w-fit">
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
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Full Description */}
      {service.fullDescription && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-100">Service Scope & Methodology</h2>
          <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
            {service.fullDescription}
          </div>
        </section>
      )}

      {/* Booking CTA */}
      <section className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-zinc-100">Ready to get started?</h3>
          <p className="text-xs text-zinc-400">Reach out to discuss requirements, scheduling, and onboarding.</p>
        </div>
        <Link
          href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2 rounded-full text-xs transition-colors shrink-0 flex items-center gap-2"
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Inquire about this service</span>
        </Link>
      </section>
    </div>
  );
}
