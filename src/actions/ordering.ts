"use server";

import { db } from "@/db";
import { portfolioSettings } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { SECTION_KEYS, serializeSectionOrder, type SectionKey } from "@/lib/sections";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { KINDS, orderedBy, type MoveDirection, type OrderableKind } from "@/lib/ordering";
import type { experiences } from "@/db/schema";


/** Moves one item within the user's list and rewrites every order index as 0..n-1. */
export async function moveItemAction(kind: OrderableKind, id: string, direction: MoveDirection) {
  const user = await requireAuth();
  const cfg = KINDS[kind];
  const t = cfg.table as typeof experiences;

  const rows = await db
    .select({ id: t.id })
    .from(t)
    .where(eq(t.userId, user.id))
    .orderBy(...orderedBy(kind));

  const ids = rows.map((r) => r.id);
  const from = ids.indexOf(id);
  if (from === -1) return;

  const to =
    direction === "up" ? Math.max(0, from - 1)
    : direction === "down" ? Math.min(ids.length - 1, from + 1)
    : direction === "top" ? 0
    : ids.length - 1;
  if (to === from) return;

  ids.splice(to, 0, ids.splice(from, 1)[0]);

  await db.transaction(async (tx) => {
    for (let i = 0; i < ids.length; i++) {
      await tx
        .update(t)
        .set({ orderIndex: i })
        .where(and(eq(t.id, ids[i]), eq(t.userId, user.id)));
    }
  });

  revalidatePath(`/dashboard/${cfg.dashboard}`);
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/${cfg.public}`);
}

/** Applies a drag-and-drop result: `ids` is the new top-to-bottom order of the user's items. */
export async function reorderItemsAction(kind: OrderableKind, ids: string[]) {
  const user = await requireAuth();
  const cfg = KINDS[kind];
  const t = cfg.table as typeof experiences;

  const rows = await db
    .select({ id: t.id })
    .from(t)
    .where(eq(t.userId, user.id))
    .orderBy(...orderedBy(kind));

  const owned = new Set(rows.map((r) => r.id));
  const requested = ids.filter((id, i) => owned.has(id) && ids.indexOf(id) === i);
  // Anything the client didn't mention keeps its current relative position at the end.
  const final = [...requested, ...rows.map((r) => r.id).filter((id) => !requested.includes(id))];

  await db.transaction(async (tx) => {
    for (let i = 0; i < final.length; i++) {
      await tx
        .update(t)
        .set({ orderIndex: i })
        .where(and(eq(t.id, final[i]), eq(t.userId, user.id)));
    }
  });

  revalidatePath(`/dashboard/${cfg.dashboard}`);
  revalidatePath(`/${user.handle}`);
  revalidatePath(`/${user.handle}/${cfg.public}`);
}

/** Saves the home-page section order and which sections are hidden. An empty order resets to the template default. */
export async function saveSectionOrderAction(order: SectionKey[], hidden: SectionKey[] = []) {
  const user = await requireAuth();
  const clean = order.filter((k, i) => (SECTION_KEYS as readonly string[]).includes(k) && order.indexOf(k) === i);
  const value = clean.length ? serializeSectionOrder(clean) : null;
  const hiddenClean = hidden.filter((k, i) => (SECTION_KEYS as readonly string[]).includes(k) && hidden.indexOf(k) === i);
  const hiddenValue = hiddenClean.length ? hiddenClean.join(",") : null;

  const existing = await db.query.portfolioSettings.findFirst({ where: eq(portfolioSettings.userId, user.id) });
  if (existing) {
    await db
      .update(portfolioSettings)
      .set({ sectionOrder: value, hiddenSections: hiddenValue, updatedAt: new Date() })
      .where(eq(portfolioSettings.userId, user.id));
  } else {
    await db.insert(portfolioSettings).values({ userId: user.id, sectionOrder: value, hiddenSections: hiddenValue });
  }

  revalidatePath("/dashboard/sections");
  revalidatePath(`/${user.handle}`);
}
