import { getPortfolioData } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-400" />
          Offered Services
        </h1>
        <p className="text-sm text-zinc-400">
          Professional architectural audits, distributed engineering, and technical advisory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.services.map((service) => (
          <Link key={service.id} href={`/${handle}/services/${service.slug}`}>
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-6 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-lg text-zinc-100 hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h2>
                  {service.price && (
                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs shrink-0">
                      {service.price}
                    </Badge>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {service.shortDescription}
                </p>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="pt-2 space-y-1.5 border-t border-zinc-800/60">
                    <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Key Deliverables</div>
                    {service.deliverables.slice(0, 3).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center text-xs text-emerald-400 font-medium gap-1">
                <span>View full details & pricing</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
