import type { Metadata } from "next";
import { createEducationAction } from "@/actions/education";
import { EducationForm } from "../education-form";

export const metadata: Metadata = { title: "New education" };

export default function NewEducationPage() {
  return <EducationForm action={createEducationAction} />;
}
