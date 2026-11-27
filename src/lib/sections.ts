import type { CSSProperties } from "react";

/**
 * Home-page sections the owner can reorder. The hero always comes first and the
 * contact banner last. "achievements" is the achievements + speaking/events block.
 */
export const SECTION_KEYS = ["experience", "education", "projects", "articles", "services", "achievements"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export const SECTION_META: Record<SectionKey, { label: string; description: string }> = {
  experience: { label: "Experience", description: "Your career timeline and featured roles" },
  education: { label: "Education", description: "Degrees, schools and qualifications" },
  projects: { label: "Projects", description: "Featured projects and case studies" },
  articles: { label: "Articles", description: "Featured writing" },
  services: { label: "Services", description: "Packages and consulting offers" },
  achievements: { label: "Achievements & Events", description: "Certifications, awards and talks" },
};

/** Each template's built-in order — used until the owner saves their own. */
export const TEMPLATE_DEFAULT_ORDER: Record<string, SectionKey[]> = {
  simple_professional: ["experience", "education", "articles", "projects", "services", "achievements"],
  fancy_creative: ["projects", "services", "articles", "experience", "education", "achievements"],
  minimal_swiss: ["articles", "experience", "education", "projects", "services", "achievements"],
  aurora_studio: ["projects", "services", "articles", "experience", "education", "achievements"],
  developer_terminal: ["articles", "experience", "education", "projects", "services", "achievements"],
  bento_grid: ["articles", "services", "experience", "education", "achievements", "projects"],
};

const isKey = (v: string): v is SectionKey => (SECTION_KEYS as readonly string[]).includes(v);

export function defaultSectionOrder(templateId: string | null | undefined): SectionKey[] {
  return TEMPLATE_DEFAULT_ORDER[templateId ?? ""] ?? TEMPLATE_DEFAULT_ORDER.simple_professional;
}

/** Saved order (unknown/duplicate keys dropped) followed by any sections it doesn't mention. */
export function resolveSectionOrder(saved: string | null | undefined, templateId: string | null | undefined): SectionKey[] {
  const fromSaved = (saved ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(isKey);
  const out: SectionKey[] = [];
  for (const k of [...fromSaved, ...defaultSectionOrder(templateId), ...SECTION_KEYS]) {
    if (!out.includes(k)) out.push(k);
  }
  return out;
}

export function serializeSectionOrder(order: SectionKey[]): string {
  return order.join(",");
}

/** Hidden section keys from the stored comma-separated value (unknown keys dropped). */
export function parseHiddenSections(raw: string | null | undefined): SectionKey[] {
  const out: SectionKey[] = [];
  for (const k of (raw ?? "").split(",").map((s) => s.trim())) {
    if (isKey(k) && !out.includes(k)) out.push(k);
  }
  return out;
}

/**
 * Returns a function giving the CSS `order` for a section. Templates put their
 * sections in a flex/grid container; the hero keeps order 0 and the closing
 * banner uses `SECTION_LAST`.
 */
export function sectionStyler(
  portfolio: {
    settings?: { sectionOrder?: string | null; hiddenSections?: string | null; templateId?: string | null } | null;
  },
): (key: SectionKey) => CSSProperties {
  const order = resolveSectionOrder(portfolio.settings?.sectionOrder, portfolio.settings?.templateId);
  const hidden = parseHiddenSections(portfolio.settings?.hiddenSections);
  // `display: none` also removes the section's grid/flex gap, so no blank space is left behind.
  return (key) => ({ order: order.indexOf(key) + 1, ...(hidden.includes(key) ? { display: "none" } : {}) });
}

export const SECTION_LAST: CSSProperties = { order: 99 };
