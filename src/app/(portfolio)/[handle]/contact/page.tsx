import { getPortfolioData } from "@/lib/portfolio-data";
import ContactPageDispatcher from "@/components/templates/subpages/contact-page-dispatcher";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);
  const templateId = portfolio.settings?.templateId || "simple_professional";

  return <ContactPageDispatcher handle={handle} templateId={templateId} />;
}
