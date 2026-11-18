import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalServiceDetail } from "../terminal/terminal-service-detail";
import { SwissServiceDetail } from "../swiss/swiss-service-detail";
import { AuroraServiceDetail } from "../aurora/aurora-service-detail";
import { BentoServiceDetail } from "../bento/bento-service-detail";
import { FancyServiceDetail } from "../fancy/fancy-service-detail";
import { SimpleServiceDetail } from "../simple/simple-service-detail";

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
  if (templateId === "aurora_studio") {
    return <AuroraServiceDetail portfolio={portfolio} service={service} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoServiceDetail portfolio={portfolio} service={service} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyServiceDetail portfolio={portfolio} service={service} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleServiceDetail portfolio={portfolio} service={service} handle={handle} />;
  }

  return <SimpleServiceDetail portfolio={portfolio} service={service} handle={handle} />;
}
