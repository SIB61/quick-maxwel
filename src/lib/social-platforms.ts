/**
 * Catalog of profile / contact platforms a user can link to.
 * Shared by the profile form, the profile action (validation), and templates.
 */

export type SocialCategory =
  | "Professional"
  | "Code & Dev"
  | "Design & Creative"
  | "Writing & Research"
  | "Social"
  | "Video & Audio"
  | "Support & Shop"
  | "Contact & Web";

export interface SocialPlatform {
  id: string;
  label: string;
  /** Short tag used by compact/typographic templates, e.g. "GH". */
  short: string;
  category: SocialCategory;
  /** Hostnames used to auto-detect the platform from a pasted URL. */
  hosts?: string[];
  placeholder: string;
  /** "mailto" platforms accept an email address instead of a web URL. */
  scheme?: "mailto";
}

export const SOCIAL_CATEGORIES: SocialCategory[] = [
  "Professional",
  "Code & Dev",
  "Design & Creative",
  "Writing & Research",
  "Social",
  "Video & Audio",
  "Support & Shop",
  "Contact & Web",
];

const p = (
  id: string,
  label: string,
  short: string,
  category: SocialCategory,
  hosts: string[],
  placeholder?: string
): SocialPlatform => ({
  id,
  label,
  short,
  category,
  hosts,
  placeholder: placeholder ?? (hosts[0] ? `https://${hosts[0]}/username` : "https://"),
});

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  // Professional
  p("linkedin", "LinkedIn", "LI", "Professional", ["linkedin.com"], "https://linkedin.com/in/username"),
  p("wellfound", "Wellfound", "WF", "Professional", ["wellfound.com", "angel.co"], "https://wellfound.com/u/username"),
  p("upwork", "Upwork", "UP", "Professional", ["upwork.com"], "https://upwork.com/freelancers/~id"),
  p("fiverr", "Fiverr", "FV", "Professional", ["fiverr.com"]),
  p("toptal", "Toptal", "TT", "Professional", ["toptal.com"], "https://toptal.com/resume/username"),
  p("peerlist", "Peerlist", "PL", "Professional", ["peerlist.io"]),
  p("polywork", "Polywork", "PW", "Professional", ["polywork.com"]),
  p("xing", "XING", "XI", "Professional", ["xing.com"], "https://xing.com/profile/username"),
  p("credly", "Credly", "CR", "Professional", ["credly.com"], "https://credly.com/users/username"),
  p("calendly", "Calendly", "CAL", "Professional", ["calendly.com"]),

  // Code & Dev
  p("github", "GitHub", "GH", "Code & Dev", ["github.com"]),
  p("gitlab", "GitLab", "GL", "Code & Dev", ["gitlab.com"]),
  p("bitbucket", "Bitbucket", "BB", "Code & Dev", ["bitbucket.org"]),
  p("codeberg", "Codeberg", "CB", "Code & Dev", ["codeberg.org"]),
  p("stackoverflow", "Stack Overflow", "SO", "Code & Dev", ["stackoverflow.com"], "https://stackoverflow.com/users/123/username"),
  p("leetcode", "LeetCode", "LC", "Code & Dev", ["leetcode.com"], "https://leetcode.com/u/username"),
  p("hackerrank", "HackerRank", "HR", "Code & Dev", ["hackerrank.com"], "https://hackerrank.com/profile/username"),
  p("codeforces", "Codeforces", "CF", "Code & Dev", ["codeforces.com"], "https://codeforces.com/profile/username"),
  p("codechef", "CodeChef", "CC", "Code & Dev", ["codechef.com"], "https://codechef.com/users/username"),
  p("codewars", "Codewars", "CW", "Code & Dev", ["codewars.com"], "https://codewars.com/users/username"),
  p("kaggle", "Kaggle", "KG", "Code & Dev", ["kaggle.com"]),
  p("huggingface", "Hugging Face", "HF", "Code & Dev", ["huggingface.co"]),
  p("npm", "npm", "NPM", "Code & Dev", ["npmjs.com"], "https://npmjs.com/~username"),
  p("pypi", "PyPI", "PY", "Code & Dev", ["pypi.org"], "https://pypi.org/user/username"),
  p("dockerhub", "Docker Hub", "DH", "Code & Dev", ["hub.docker.com"], "https://hub.docker.com/u/username"),
  p("codepen", "CodePen", "CP", "Code & Dev", ["codepen.io"]),
  p("codesandbox", "CodeSandbox", "CSB", "Code & Dev", ["codesandbox.io"], "https://codesandbox.io/u/username"),
  p("replit", "Replit", "RE", "Code & Dev", ["replit.com"], "https://replit.com/@username"),
  p("devto", "DEV Community", "DEV", "Code & Dev", ["dev.to"]),
  p("hashnode", "Hashnode", "HN", "Code & Dev", ["hashnode.com", "hashnode.dev"], "https://hashnode.com/@username"),
  p("dailydev", "daily.dev", "DD", "Code & Dev", ["app.daily.dev", "daily.dev"], "https://app.daily.dev/username"),
  p("hackerone", "HackerOne", "H1", "Code & Dev", ["hackerone.com"]),
  p("tryhackme", "TryHackMe", "THM", "Code & Dev", ["tryhackme.com"], "https://tryhackme.com/p/username"),
  p("hackthebox", "Hack The Box", "HTB", "Code & Dev", ["hackthebox.com", "app.hackthebox.com"], "https://app.hackthebox.com/profile/123"),

  // Design & Creative
  p("dribbble", "Dribbble", "DR", "Design & Creative", ["dribbble.com"]),
  p("behance", "Behance", "BE", "Design & Creative", ["behance.net"]),
  p("figma", "Figma", "FG", "Design & Creative", ["figma.com"], "https://figma.com/@username"),
  p("framer", "Framer", "FR", "Design & Creative", ["framer.com"], "https://framer.com/@username"),
  p("webflow", "Webflow", "WB", "Design & Creative", ["webflow.com"], "https://webflow.com/@username"),
  p("artstation", "ArtStation", "AS", "Design & Creative", ["artstation.com"]),
  p("deviantart", "DeviantArt", "DA", "Design & Creative", ["deviantart.com"]),
  p("sketchfab", "Sketchfab", "SF", "Design & Creative", ["sketchfab.com"]),
  p("pinterest", "Pinterest", "PIN", "Design & Creative", ["pinterest.com"]),
  p("unsplash", "Unsplash", "UN", "Design & Creative", ["unsplash.com"], "https://unsplash.com/@username"),
  p("flickr", "Flickr", "FL", "Design & Creative", ["flickr.com"], "https://flickr.com/photos/username"),
  p("vsco", "VSCO", "VS", "Design & Creative", ["vsco.co"]),

  // Writing & Research
  p("medium", "Medium", "MD", "Writing & Research", ["medium.com"], "https://medium.com/@username"),
  p("substack", "Substack", "SS", "Writing & Research", ["substack.com"], "https://username.substack.com"),
  p("wordpress", "WordPress", "WP", "Writing & Research", ["wordpress.com"], "https://username.wordpress.com"),
  p("ghost", "Ghost", "GB", "Writing & Research", ["ghost.io"], "https://username.ghost.io"),
  p("tumblr", "Tumblr", "TB", "Writing & Research", ["tumblr.com"], "https://username.tumblr.com"),
  p("quora", "Quora", "QU", "Writing & Research", ["quora.com"], "https://quora.com/profile/username"),
  p("goodreads", "Goodreads", "GR", "Writing & Research", ["goodreads.com"], "https://goodreads.com/user/show/123-username"),
  p("googlescholar", "Google Scholar", "GS", "Writing & Research", ["scholar.google.com"], "https://scholar.google.com/citations?user=ID"),
  p("researchgate", "ResearchGate", "RG", "Writing & Research", ["researchgate.net"], "https://researchgate.net/profile/Name"),
  p("orcid", "ORCID", "ORC", "Writing & Research", ["orcid.org"], "https://orcid.org/0000-0000-0000-0000"),

  // Social
  p("twitter", "X (Twitter)", "X", "Social", ["x.com", "twitter.com"], "https://x.com/username"),
  p("instagram", "Instagram", "IG", "Social", ["instagram.com"]),
  p("facebook", "Facebook", "FB", "Social", ["facebook.com", "fb.com"]),
  p("threads", "Threads", "TH", "Social", ["threads.net", "threads.com"], "https://threads.net/@username"),
  p("bluesky", "Bluesky", "BSKY", "Social", ["bsky.app"], "https://bsky.app/profile/username.bsky.social"),
  p("mastodon", "Mastodon", "MA", "Social", ["mastodon.social"], "https://mastodon.social/@username"),
  p("tiktok", "TikTok", "TK", "Social", ["tiktok.com"], "https://tiktok.com/@username"),
  p("reddit", "Reddit", "RD", "Social", ["reddit.com"], "https://reddit.com/user/username"),
  p("snapchat", "Snapchat", "SC", "Social", ["snapchat.com"], "https://snapchat.com/add/username"),
  p("discord", "Discord", "DC", "Social", ["discord.gg", "discord.com"], "https://discord.gg/invite"),
  p("telegram", "Telegram", "TG", "Social", ["t.me", "telegram.me"], "https://t.me/username"),
  p("whatsapp", "WhatsApp", "WA", "Social", ["wa.me"], "https://wa.me/15551234567"),

  // Video & Audio
  p("youtube", "YouTube", "YT", "Video & Audio", ["youtube.com", "youtu.be"], "https://youtube.com/@channel"),
  p("twitch", "Twitch", "TW", "Video & Audio", ["twitch.tv"]),
  p("kick", "Kick", "KK", "Video & Audio", ["kick.com"]),
  p("vimeo", "Vimeo", "VI", "Video & Audio", ["vimeo.com"]),
  p("spotify", "Spotify", "SP", "Video & Audio", ["open.spotify.com", "spotify.com"], "https://open.spotify.com/artist/ID"),
  p("applepodcasts", "Apple Podcasts", "POD", "Video & Audio", ["podcasts.apple.com"], "https://podcasts.apple.com/podcast/ID"),
  p("soundcloud", "SoundCloud", "SND", "Video & Audio", ["soundcloud.com"]),
  p("bandcamp", "Bandcamp", "BC", "Video & Audio", ["bandcamp.com"], "https://username.bandcamp.com"),
  p("mixcloud", "Mixcloud", "MX", "Video & Audio", ["mixcloud.com"]),
  p("letterboxd", "Letterboxd", "LB", "Video & Audio", ["letterboxd.com"]),

  // Support & Shop
  p("patreon", "Patreon", "PT", "Support & Shop", ["patreon.com"]),
  p("buymeacoffee", "Buy Me a Coffee", "BMC", "Support & Shop", ["buymeacoffee.com"]),
  p("kofi", "Ko-fi", "KO", "Support & Shop", ["ko-fi.com"]),
  p("gumroad", "Gumroad", "GU", "Support & Shop", ["gumroad.com"], "https://username.gumroad.com"),
  p("itchio", "itch.io", "ITCH", "Support & Shop", ["itch.io"], "https://username.itch.io"),
  p("producthunt", "Product Hunt", "PH", "Support & Shop", ["producthunt.com"], "https://producthunt.com/@username"),

  // Contact & Web
  p("website", "Website", "WEB", "Contact & Web", [], "https://yourdomain.com"),
  p("blog", "Blog", "BLOG", "Contact & Web", [], "https://yourdomain.com/blog"),
  p("linktree", "Linktree", "LT", "Contact & Web", ["linktr.ee"]),
  { id: "email", label: "Email", short: "MAIL", category: "Contact & Web", placeholder: "you@example.com", scheme: "mailto" },
  p("other", "Other Link", "LINK", "Contact & Web", [], "https://"),
];

export const SOCIAL_PLATFORM_MAP: Record<string, SocialPlatform> = Object.fromEntries(
  SOCIAL_PLATFORMS.map((platform) => [platform.id, platform])
);

export const MAX_SOCIAL_LINKS = 40;

export interface SocialLink {
  platform: string;
  url: string;
}

/** Stored shape: legacy `{ github: url, ... }` objects or the ordered array format. */
export type StoredSocialLinks = SocialLink[] | Record<string, string | undefined> | null | undefined;

/** Returns a safe href, or null if the value can't be linked to. */
export function socialHref(platformId: string, value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if (SOCIAL_PLATFORM_MAP[platformId]?.scheme === "mailto") {
    const email = v.replace(/^mailto:/i, "");
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : null;
  }
  return /^https?:\/\/[^\s]+$/i.test(v) ? v : null;
}

/** Normalizes stored links into an ordered, de-duplicated list of known, safe links. */
export function normalizeSocialLinks(stored: StoredSocialLinks): SocialLink[] {
  if (!stored) return [];
  const entries: SocialLink[] = Array.isArray(stored)
    ? stored
    : Object.entries(stored).map(([platform, url]) => ({ platform, url: url ?? "" }));

  const seen = new Set<string>();
  const result: SocialLink[] = [];
  for (const entry of entries) {
    if (!entry || typeof entry.platform !== "string" || typeof entry.url !== "string") continue;
    if (!SOCIAL_PLATFORM_MAP[entry.platform] || seen.has(entry.platform)) continue;
    const href = socialHref(entry.platform, entry.url);
    if (!href) continue;
    seen.add(entry.platform);
    result.push({ platform: entry.platform, url: href });
  }
  return result;
}

/** Guesses the platform from a URL's hostname (e.g. "https://dribbble.com/x" -> "dribbble"). */
export function detectSocialPlatform(value: string): string | null {
  const v = value.trim();
  if (/^(mailto:)?[^\s@/]+@[^\s@/]+\.[^\s@/]+$/i.test(v)) return "email";
  let host: string;
  try {
    host = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
  for (const platform of SOCIAL_PLATFORMS) {
    if (platform.hosts?.some((h) => host === h || host.endsWith(`.${h}`))) return platform.id;
  }
  return null;
}
