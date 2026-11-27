import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { db } from "@/db";
import { education } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, GraduationCap, Star, Trash2, Edit3, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { SortableList } from "@/components/dashboard/sortable-list";
import { ReorderButtons } from "@/components/dashboard/reorder-buttons";
import { orderedBy } from "@/lib/ordering";
import { deleteEducationAction, toggleEducationFeaturedAction } from "@/actions/education";

export default async function DashboardEducationPage() {
  const user = await requireAuth();

  const userEducation = await db.query.education.findMany({
    where: eq(education.userId, user.id),
    orderBy: orderedBy("education"),
  });

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50 flex items-center gap-2.5">
            <GraduationCap className="h-7 w-7 text-sky-400" />
            <span>Education</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your degrees, schools, certifications and featured qualifications.
          </p>
        </div>

        <Button asChild className="h-11 px-5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-sm font-semibold transition-all shadow-lg shadow-sky-500/10">
          <Link href="/dashboard/education/new">
            <Plus className="h-4 w-4 mr-2" />
            <span>Add Education</span>
          </Link>
        </Button>
      </div>

      {/* List */}
      {userEducation.length === 0 ? (
        <Card className="bg-zinc-900/40 border-zinc-800/80 rounded-2xl p-12 text-center space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center mx-auto text-zinc-400">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-zinc-100">No education added yet</h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
              Add your degrees and schools to round out your story.
            </p>
          </div>
          <Button asChild className="h-10 px-4 rounded-xl bg-sky-500 text-black font-semibold text-xs">
            <Link href="/dashboard/education/new">Add Your First Entry</Link>
          </Button>
        </Card>
      ) : (
        <SortableList
          kind="education"
          className="space-y-3.5"
          items={userEducation.map((edu, idx) => ({
            id: edu.id,
            node: (
              <Card
                key={edu.id}
                className="bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-6 py-5 gap-0 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {edu.isFeatured && (
                      <Badge variant="outline" className="border-amber-500/30 text-amber-400 bg-amber-500/10 text-xs px-2 py-0.5">
                        <Star className="h-3 w-3 mr-1 fill-amber-400" />
                        Featured
                      </Badge>
                    )}
                    {edu.fieldOfStudy && (
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5">
                        {edu.fieldOfStudy}
                      </Badge>
                    )}
                    <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                      <Calendar className="h-3 w-3 text-zinc-500" />
                      {edu.startDate} — {edu.endDate || "Present"}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-bold text-lg text-zinc-100">{edu.degree}</h2>
                    <div className="text-sm text-sky-400 flex items-center gap-2 mt-0.5">
                      <span>{edu.institution}</span>
                      {edu.location && (
                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                          • <MapPin className="h-3 w-3 inline text-zinc-500" /> {edu.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {edu.grade && (
                    <p className="text-xs text-zinc-400 pt-1">Grade: <span className="text-zinc-200">{edu.grade}</span></p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/60">
                  <ReorderButtons kind="education" id={edu.id} isFirst={idx === 0} isLast={idx === userEducation.length - 1} />
                  <form action={toggleEducationFeaturedAction.bind(null, edu.id, edu.isFeatured)}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className={`h-9 px-3 rounded-lg text-xs border-zinc-800 hover:border-zinc-700 ${edu.isFeatured ? "text-amber-400 bg-amber-500/10" : "text-zinc-400"}`}
                    >
                      <Star className={`h-3.5 w-3.5 mr-1.5 ${edu.isFeatured ? "fill-amber-400" : ""}`} />
                      <span>{edu.isFeatured ? "Unfeature" : "Feature"}</span>
                    </Button>
                  </form>

                  <Button asChild variant="outline" size="sm" className="h-9 px-3 rounded-lg text-xs border-zinc-800 hover:border-zinc-700 text-zinc-300">
                    <Link href={`/dashboard/education/${edu.id}/edit`}>
                      <Edit3 className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
                      <span>Edit</span>
                    </Link>
                  </Button>

                  <form action={deleteEducationAction.bind(null, edu.id)}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="h-9 px-2.5 rounded-lg text-xs text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                      title="Delete education"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            ),
          }))}
        />
      )}
    </div>
  );
}

export const metadata: Metadata = { title: "Education" };
