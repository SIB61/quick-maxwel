import type { DemoProfile } from "./types";

/** Marketing & brand strategist: client results, consulting packages, workshops. */
export const grace: DemoProfile = {
  user: {
    handle: "grace",
    name: "Grace Whitfield",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    headline: "Marketing & Brand Strategist for B2B SaaS",
    bio: "I help B2B software companies find their positioning, build a brand people remember, and turn it into pipeline. Former VP Marketing; now an independent consultant working with seed to Series C teams.",
    location: "London, UK",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com" },
      { platform: "substack", url: "https://substack.com" },
      { platform: "twitter", url: "https://x.com" },
      { platform: "youtube", url: "https://youtube.com" },
      { platform: "calendly", url: "https://calendly.com" },
    ],
  },
  settings: {
    templateId: "bento_grid",
    colorPalette: "ocean",
    primaryColor: "#0c4a6e",
    accentColor: "#22d3ee",
    fontFamily: "sans",
    seoTitle: "Grace Whitfield — Marketing & Brand Strategist",
    seoDescription: "Positioning, brand, and growth strategy for B2B SaaS by Grace Whitfield.",
    seoKeywords: "B2B marketing, positioning, brand strategy, SaaS, consultant",
  },
  articles: [
    {
      title: "Positioning Is a Decision, Not a Tagline",
      slug: "positioning-is-a-decision",
      excerpt: "The three questions I ask every founder before we write a single word of copy.",
      content: `# Positioning Is a Decision, Not a Tagline

Most "positioning problems" are really **decision problems**. Before any copy, we agree on:

1. **Who** we are best for (and who we are not for).
2. **What** they would use if we didn't exist.
3. **Why** we are meaningfully better for them.

When those answers are sharp, the tagline almost writes itself.`,
      coverImageUrl: null,
      tags: ["Positioning", "Strategy"],
      isFeatured: true,
      isPublished: true,
    },
    {
      title: "Your Webinar Program Is Probably Too Big",
      slug: "webinar-program-too-big",
      excerpt: "Why we cut a client's webinars from 4 a month to 1, and pipeline went up.",
      content: `# Your Webinar Program Is Probably Too Big

We replaced four generic webinars a month with **one deep, customer-led session**. Attendance fell 30%, but sales-qualified pipeline from webinars rose **2.4×**.`,
      coverImageUrl: null,
      tags: ["Demand Generation", "B2B"],
      isFeatured: true,
      isPublished: true,
    },
  ],
  experiences: [
    {
      company: "Whitfield Strategy",
      role: "Founder & Principal Consultant",
      location: "London, UK",
      employmentType: "Freelance",
      startDate: "2022-01",
      endDate: "Present",
      isCurrent: true,
      description: "Positioning, brand, and go-to-market strategy for 30+ B2B SaaS companies.",
      skills: ["Positioning", "Brand Strategy", "Go-to-Market", "Messaging"],
      companyUrl: "https://whitfieldstrategy.example.com",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      company: "Ledgerline",
      role: "VP Marketing",
      location: "London, UK",
      employmentType: "Full-time",
      startDate: "2018-04",
      endDate: "2021-12",
      isCurrent: false,
      description: "Grew marketing from 2 to 18 people; led the rebrand and category launch ahead of the Series C.",
      skills: ["Team Leadership", "Demand Generation", "Brand", "Analytics"],
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  achievements: [
    {
      title: "Top 50 B2B Marketers to Follow",
      issuer: "B2B Marketing Europe",
      issueDate: "2024",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Best Rebrand, Technology Sector",
      issuer: "UK Brand Awards",
      issueDate: "2021",
      description: "For the Ledgerline rebrand and category launch.",
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  services: [
    {
      title: "Positioning Sprint",
      slug: "positioning-sprint",
      shortDescription: "Three weeks to a clear, defensible position your whole team can repeat.",
      pricingType: "fixed",
      price: "£12,000",
      deliverables: ["Customer interviews", "Positioning canvas", "Messaging framework", "Team workshop"],
      icon: "Target",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Fractional CMO",
      slug: "fractional-cmo",
      shortDescription: "Senior marketing leadership two days a week, without a full-time hire.",
      pricingType: "quote",
      price: "From £6,500 / month",
      deliverables: ["Marketing strategy & plan", "Team coaching", "Board-ready reporting"],
      icon: "Briefcase",
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  projects: [
    {
      title: "Ledgerline Rebrand & Category Launch",
      slug: "ledgerline-rebrand",
      summary: "Repositioned a payments tool as the leader of a new category: 'finance operations'.",
      role: "VP Marketing",
      status: "completed",
      timeline: "2021",
      techStack: ["Positioning", "Brand Identity", "Analyst Relations"],
      highlights: ["Inbound demo requests up 3.1×", "Won 'Best Rebrand' at the UK Brand Awards"],
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Positioning Sprint for a Seed-Stage DevTool",
      slug: "devtool-positioning-sprint",
      summary: "Narrowed a broad developer platform to one sharp use case and audience.",
      role: "Consultant",
      status: "completed",
      timeline: "2024",
      techStack: ["Customer Interviews", "Messaging", "Website Copy"],
      highlights: ["Landing page conversion 1.9% → 5.2%"],
      isFeatured: true,
      orderIndex: 1,
    },
  ],
  events: [
    {
      title: "SaaStock Europe: Positioning for Category Creators",
      slug: "saastock-positioning",
      eventType: "Speaking",
      date: "Oct 13, 2026",
      location: "Dublin, Ireland",
      description: "How to decide whether to create a category, and what it costs.",
      isFeatured: true,
      orderIndex: 0,
    },
    {
      title: "Founder Workshop: Messaging That Sells",
      slug: "founder-workshop-messaging",
      eventType: "Workshop",
      date: "Jun 5, 2026",
      location: "London, UK",
      description: "Half-day workshop for founders writing their own homepage and sales deck.",
      isFeatured: true,
      orderIndex: 1,
    },
  ],
};
