import { getPortfolioData } from "@/lib/portfolio-data";
import { getPaletteConfig, FONTS, FontFamily, TemplateId } from "@/lib/templates";
import TemplateNavbar from "@/components/templates/nav/template-navbar";
import TemplateFooter from "@/components/templates/nav/template-footer";
import { TemplatePreviewBanner } from "@/components/templates/nav/template-preview-banner";
import React from "react";

export const dynamic = "force-dynamic";

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  const paletteConfig = getPaletteConfig(portfolio.settings?.colorPalette);
  const fontKey = (portfolio.settings?.fontFamily || "sans") as FontFamily;
  const fontClass = FONTS[fontKey]?.className || "font-sans";

  return (
    <div
      className={`min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between ${fontClass}`}
      style={
        {
          "--theme-accent": paletteConfig.accentHex,
          "--theme-accent-glow": paletteConfig.glowRgba,
          "--theme-primary": paletteConfig.primaryHex,
        } as React.CSSProperties
      }
    >
      {/* Template Preview Switcher Banner (when in preview mode) */}
      {portfolio.isPreview && (
        <TemplatePreviewBanner
          activeTemplate={portfolio.settings?.templateId as TemplateId}
          handle={handle}
        />
      )}

      {/* Template-Specific Navbar */}
      <TemplateNavbar portfolio={portfolio} handle={handle} />

      {/* Main Portfolio Content */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Template-Specific Footer */}
      <TemplateFooter portfolio={portfolio} handle={handle} />
    </div>
  );
}
