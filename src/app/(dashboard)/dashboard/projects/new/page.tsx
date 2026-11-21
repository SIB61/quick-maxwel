import { requireAuth } from "@/lib/auth";
import { ProjectForm } from "../project-form";

export default async function NewProjectPage() {
  const user = await requireAuth();
  return <ProjectForm userHandle={user.handle} />;
}
