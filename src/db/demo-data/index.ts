import { DEMO_ACCOUNTS } from "../../lib/demo-account";
import type { DemoProfile } from "./types";
import { sarah } from "./sarah";
import { maya } from "./maya";
import { amir } from "./amir";
import { elena } from "./elena";
import { daniel } from "./daniel";
import { priya } from "./priya";
import { lucas } from "./lucas";
import { grace } from "./grace";

const PROFILES: Record<string, DemoProfile> = { sarah, maya, amir, elena, daniel, priya, lucas, grace };

/** Demo profiles in landing-page order, each paired with its account metadata. */
export const DEMO_PROFILES = DEMO_ACCOUNTS.map((account) => {
  const profile = PROFILES[account.handle];
  if (!profile) throw new Error(`Missing demo profile data for "${account.handle}"`);
  if (profile.user.handle !== account.handle) {
    throw new Error(`Demo profile handle mismatch: ${account.handle} vs ${profile.user.handle}`);
  }
  return { account, profile };
});
