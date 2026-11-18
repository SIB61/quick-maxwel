import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalEventDetail } from "../terminal/terminal-event-detail";
import { SwissEventDetail } from "../swiss/swiss-event-detail";
import { AuroraEventDetail } from "../aurora/aurora-event-detail";
import { BentoEventDetail } from "../bento/bento-event-detail";
import { FancyEventDetail } from "../fancy/fancy-event-detail";
import { SimpleEventDetail } from "../simple/simple-event-detail";

export default function EventDetailPageDispatcher({
  portfolio,
  event,
  handle,
}: {
  portfolio: PortfolioUser;
  event: NonNullable<PortfolioUser["events"][number]>;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }

  return <SimpleEventDetail portfolio={portfolio} event={event} handle={handle} />;
}
