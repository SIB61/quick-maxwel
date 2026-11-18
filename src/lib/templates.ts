export type TemplateId = "simple_professional" | "fancy_creative" | "bento_grid";
export type ColorPalette = "slate" | "emerald" | "neon" | "terracotta" | "ocean";
export type FontFamily = "sans" | "serif" | "mono";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  recommendedFor: string;
}

export interface PaletteConfig {
  id: ColorPalette;
  name: string;
  primaryHex: string;
  accentHex: string;
  accentForeground: string;
  glowRgba: string;
  gradient: string;
  description: string;
}

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  simple_professional: {
    id: "simple_professional",
    name: "Simple Professional",
    tagline: "Clean, structured, and editorial",
    description:
      "Minimalist resume-oriented layout focusing on clarity, elegant typography, structured timelines, and clear reading experiences.",
    tags: ["Minimalist", "Resume", "Fast", "Clean"],
    recommendedFor: "Staff Engineers, Engineering Managers, Consultants",
  },
  fancy_creative: {
    id: "fancy_creative",
    name: "Fancy Creative",
    tagline: "Fluid gradients, glassmorphism, and bold aesthetics",
    description:
      "A visually rich presentation featuring gradient mesh lighting, glassmorphic cards, glowing status badges, and animated micro-interactions.",
    tags: ["Glassmorphism", "Gradients", "Animations", "Modern"],
    recommendedFor: "Product Designers, Creative Technologists, Founders",
  },
  bento_grid: {
    id: "bento_grid",
    name: "Bento Grid",
    tagline: "High-density modular tiles and asymmetrical grid",
    description:
      "Apple and Linear inspired bento-box grid organizing bio, projects, achievements, and availability into tactile interactive tiles.",
    tags: ["Bento Box", "Grid UI", "High Density", "Interactive"],
    recommendedFor: "Full-Stack Devs, Indie Hackers, Multidisciplinary Creators",
  },
};

export const PALETTES: Record<ColorPalette, PaletteConfig> = {
  slate: {
    id: "slate",
    name: "Slate & Sky",
    primaryHex: "#0f172a",
    accentHex: "#38bdf8",
    accentForeground: "#000000",
    glowRgba: "rgba(56, 189, 248, 0.25)",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    description: "Crisp architectural slate paired with vibrant sky-blue accents.",
  },
  emerald: {
    id: "emerald",
    name: "Midnight Emerald",
    primaryHex: "#062016",
    accentHex: "#10b981",
    accentForeground: "#000000",
    glowRgba: "rgba(16, 185, 129, 0.25)",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    description: "Deep obsidian backdrop with energetic emerald and mint accents.",
  },
  neon: {
    id: "neon",
    name: "Cyber Neon",
    primaryHex: "#1b0a2a",
    accentHex: "#c084fc",
    accentForeground: "#000000",
    glowRgba: "rgba(192, 132, 252, 0.3)",
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    description: "Futuristic dark synthwave palette with electric purple and fuchsia glows.",
  },
  terracotta: {
    id: "terracotta",
    name: "Warm Terracotta",
    primaryHex: "#271206",
    accentHex: "#fb923c",
    accentForeground: "#000000",
    glowRgba: "rgba(251, 146, 60, 0.25)",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    description: "Warm organic espresso foundation with radiant amber and terracotta highlights.",
  },
  ocean: {
    id: "ocean",
    name: "Deep Ocean",
    primaryHex: "#041926",
    accentHex: "#22d3ee",
    accentForeground: "#000000",
    glowRgba: "rgba(34, 211, 238, 0.25)",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    description: "Submarine navy blue accented with luminous cyan and aqua.",
  },
};

export const FONTS: Record<FontFamily, { id: FontFamily; name: string; description: string; className: string }> = {
  sans: {
    id: "sans",
    name: "Modern Sans-Serif",
    description: "Clean, neutral, and readable across all devices.",
    className: "font-sans",
  },
  serif: {
    id: "serif",
    name: "Editorial Serif",
    description: "Sophisticated, authoritative, and literary aesthetic.",
    className: "font-serif",
  },
  mono: {
    id: "mono",
    name: "Technical Monospace",
    description: "Developer-centric, precise, code-first look and feel.",
    className: "font-mono",
  },
};

export function getPaletteConfig(paletteId?: string | null): PaletteConfig {
  if (paletteId && paletteId in PALETTES) {
    return PALETTES[paletteId as ColorPalette];
  }
  return PALETTES.emerald;
}

export function getTemplateConfig(templateId?: string | null): TemplateConfig {
  if (templateId && templateId in TEMPLATES) {
    return TEMPLATES[templateId as TemplateId];
  }
  return TEMPLATES.simple_professional;
}
