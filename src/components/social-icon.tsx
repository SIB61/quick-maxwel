import type { SVGProps } from "react";
import { CodeXml, Globe, Link2, Mail, Rss } from "lucide-react";
import {
  siApplepodcasts, siArtstation, siBandcamp, siBehance, siBitbucket, siBluesky, siBuymeacoffee, siCalendly,
  siCodeberg, siCodechef, siCodeforces, siCodesandbox, siCodewars, siCredly, siDailydotdev, siDevdotto,
  siDeviantart, siDiscord, siDocker, siDribbble, siFacebook, siFigma, siFiverr, siFlickr, siFramer, siGhost,
  siGithub, siGitlab, siGoodreads, siGooglescholar, siGumroad, siHackerone, siHackerrank, siHackthebox,
  siHashnode, siHuggingface, siInstagram, siItchdotio, siKaggle, siKick, siKofi, siLeetcode, siLetterboxd,
  siLinktree, siMastodon, siMedium, siMixcloud, siNpm, siOrcid, siPatreon, siPeerlist, siPinterest,
  siPolywork, siProducthunt, siPypi, siQuora, siReddit, siReplit, siResearchgate, siSketchfab, siSnapchat,
  siSoundcloud, siSpotify, siStackoverflow, siSubstack, siTelegram, siThreads, siTiktok, siToptal,
  siTryhackme, siTumblr, siTwitch, siUnsplash, siUpwork, siVimeo, siVsco, siWebflow, siWellfound,
  siWhatsapp, siWordpress, siX, siXing, siYoutube,
} from "simple-icons";
import { LinkedinIcon } from "@/components/icons";

type BrandIcon = { path: string; title: string };

const BRAND_ICONS: Record<string, BrandIcon> = {
  wellfound: siWellfound, upwork: siUpwork, fiverr: siFiverr, toptal: siToptal, peerlist: siPeerlist,
  polywork: siPolywork, xing: siXing, credly: siCredly, calendly: siCalendly,
  github: siGithub, gitlab: siGitlab, bitbucket: siBitbucket, codeberg: siCodeberg, stackoverflow: siStackoverflow,
  leetcode: siLeetcode, hackerrank: siHackerrank, codeforces: siCodeforces, codechef: siCodechef,
  codewars: siCodewars, kaggle: siKaggle, huggingface: siHuggingface, npm: siNpm, pypi: siPypi,
  dockerhub: siDocker, codesandbox: siCodesandbox, replit: siReplit, devto: siDevdotto, hashnode: siHashnode,
  dailydev: siDailydotdev, hackerone: siHackerone, tryhackme: siTryhackme, hackthebox: siHackthebox,
  dribbble: siDribbble, behance: siBehance, figma: siFigma, framer: siFramer, webflow: siWebflow,
  artstation: siArtstation, deviantart: siDeviantart, sketchfab: siSketchfab, pinterest: siPinterest,
  unsplash: siUnsplash, flickr: siFlickr, vsco: siVsco,
  medium: siMedium, substack: siSubstack, wordpress: siWordpress, ghost: siGhost, tumblr: siTumblr,
  quora: siQuora, goodreads: siGoodreads, googlescholar: siGooglescholar, researchgate: siResearchgate,
  orcid: siOrcid,
  twitter: siX, instagram: siInstagram, facebook: siFacebook, threads: siThreads, bluesky: siBluesky,
  mastodon: siMastodon, tiktok: siTiktok, reddit: siReddit, snapchat: siSnapchat, discord: siDiscord,
  telegram: siTelegram, whatsapp: siWhatsapp,
  youtube: siYoutube, twitch: siTwitch, kick: siKick, vimeo: siVimeo, spotify: siSpotify,
  applepodcasts: siApplepodcasts, soundcloud: siSoundcloud, bandcamp: siBandcamp, mixcloud: siMixcloud,
  letterboxd: siLetterboxd,
  patreon: siPatreon, buymeacoffee: siBuymeacoffee, kofi: siKofi, gumroad: siGumroad, itchio: siItchdotio,
  producthunt: siProducthunt, linktree: siLinktree,
};

const OUTLINE_ICONS = { website: Globe, blog: Rss, email: Mail, other: Link2, codepen: CodeXml } as const;

/** Monochrome (currentColor) icon for a social platform id. */
export function SocialIcon({ platform, ...props }: { platform: string } & SVGProps<SVGSVGElement>) {
  const brand = BRAND_ICONS[platform];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d={brand.path} />
      </svg>
    );
  }
  if (platform === "linkedin") {
    return <LinkedinIcon aria-hidden="true" {...props} />;
  }
  const Outline = OUTLINE_ICONS[platform as keyof typeof OUTLINE_ICONS] ?? Link2;
  return <Outline aria-hidden="true" {...(props as object)} />;
}
