import type {
  NewAchievement,
  NewArticle,
  NewContact,
  NewEvent,
  NewExperience,
  NewPortfolioSettings,
  NewProject,
  NewService,
  NewUser,
} from "../schema";

type WithoutOwner<T> = Omit<T, "id" | "userId" | "createdAt" | "updatedAt">;

/** Everything needed to seed one demo portfolio (rows are inserted for the new user). */
export interface DemoProfile {
  user: Omit<WithoutOwner<NewUser>, "email" | "passwordHash"> & { handle: string; name: string };
  settings: WithoutOwner<NewPortfolioSettings>;
  articles: Omit<WithoutOwner<NewArticle>, "readTime">[];
  experiences: WithoutOwner<NewExperience>[];
  achievements: WithoutOwner<NewAchievement>[];
  services: WithoutOwner<NewService>[];
  projects: WithoutOwner<NewProject>[];
  events: WithoutOwner<NewEvent>[];
  contacts?: WithoutOwner<NewContact>[];
}
