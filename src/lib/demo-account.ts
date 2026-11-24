/**
 * Seeded demo accounts that power the public showcase portfolios (one per
 * profession). Their credentials are public (seed script, README), so in
 * production nobody may sign in as them: logins are refused and existing
 * sessions are ignored. Set ALLOW_DEMO_LOGIN=true to override (e.g. on a
 * private staging server).
 */

export type DemoDiscipline =
  | "Technology"
  | "Design & Creative"
  | "Healthcare"
  | "Research & Academia"
  | "Engineering"
  | "Business";

export interface DemoAccount {
  handle: string;
  email: string;
  name: string;
  profession: string;
  discipline: DemoDiscipline;
  /** One line for the landing page showcase card. */
  pitch: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    handle: "sarah",
    email: "sarah@example.com",
    name: "Sarah Jenkins",
    profession: "Software Engineer",
    discipline: "Technology",
    pitch: "Open-source work, technical writing, and conference talks in one place.",
  },
  {
    handle: "maya",
    email: "maya@example.com",
    name: "Maya Chen",
    profession: "Product & Brand Designer",
    discipline: "Design & Creative",
    pitch: "Case studies with process, outcomes, and design services clients can book.",
  },
  {
    handle: "amir",
    email: "amir@example.com",
    name: "Dr. Amir Rahman",
    profession: "Cardiologist",
    discipline: "Healthcare",
    pitch: "Clinical background, publications, patient education, and consultation info.",
  },
  {
    handle: "elena",
    email: "elena@example.com",
    name: "Dr. Elena Novak",
    profession: "Climate Scientist",
    discipline: "Research & Academia",
    pitch: "Research programs, publications, grants, and invited talks for an academic profile.",
  },
  {
    handle: "daniel",
    email: "daniel@example.com",
    name: "Daniel Okafor, PE",
    profession: "Structural & Civil Engineer",
    discipline: "Engineering",
    pitch: "Delivered infrastructure projects, licenses, and engineering services.",
  },
  {
    handle: "priya",
    email: "priya@example.com",
    name: "Priya Nair",
    profession: "Data Scientist & ML Engineer",
    discipline: "Technology",
    pitch: "Models in production, Kaggle results, and applied ML writing.",
  },
  {
    handle: "lucas",
    email: "lucas@example.com",
    name: "Lucas Moreau",
    profession: "Photographer & Filmmaker",
    discipline: "Design & Creative",
    pitch: "Commissions, exhibitions, and booking packages for a visual storyteller.",
  },
  {
    handle: "grace",
    email: "grace@example.com",
    name: "Grace Whitfield",
    profession: "Marketing & Brand Strategist",
    discipline: "Business",
    pitch: "Client results, consulting packages, and workshops for an independent consultant.",
  },
];

/** The flagship demo used by the landing page hero and route explorer. */
export const DEMO_USER_HANDLE = "sarah";

const DEMO_EMAILS = new Set(DEMO_ACCOUNTS.map((a) => a.email));

export function isDemoLoginAllowed() {
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_DEMO_LOGIN === "true";
}

export function isBlockedDemoAccount(email: string | null | undefined) {
  return !isDemoLoginAllowed() && !!email && DEMO_EMAILS.has(email.toLowerCase().trim());
}
