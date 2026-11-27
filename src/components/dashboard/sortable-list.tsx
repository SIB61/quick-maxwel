"use client";

import { useState, useTransition, type ReactNode } from "react";
import { GripVertical } from "lucide-react";
import { reorderItemsAction } from "@/actions/ordering";
import type { OrderableKind } from "@/lib/ordering";

type Item = { id: string; node: ReactNode };

/**
 * Drag-and-drop wrapper for a dashboard list. Cards are rendered by the server;
 * this only owns the order. The up/down buttons inside each card stay as the
 * keyboard / touch fallback (native drag events don't fire on touch screens).
 */
export function SortableList({ kind, items, className }: { kind: OrderableKind; items: Item[]; className?: string }) {
  const [ids, setIds] = useState(() => items.map((i) => i.id));
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const byId = new Map(items.map((i) => [i.id, i.node]));
  const ordered = ids.filter((id) => byId.has(id));

  const drop = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const next = ordered.filter((id) => id !== dragId);
    const at = next.indexOf(targetId);
    // Dropping on a card places the dragged one where that card is (before it when moving up, after when moving down).
    const from = ordered.indexOf(dragId);
    const to = ordered.indexOf(targetId);
    next.splice(from < to ? at + 1 : at, 0, dragId);
    setIds(next);
    startTransition(async () => {
      await reorderItemsAction(kind, next);
    });
  };

  return (
    <div className={`${className ?? ""} ${pending ? "opacity-80" : ""}`} aria-busy={pending}>
      {ordered.map((id) => (
        <div
          key={id}
          draggable
          onDragStart={(e) => {
            setDragId(id);
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", id);
          }}
          onDragOver={(e) => {
            if (!dragId) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (overId !== id) setOverId(id);
          }}
          onDrop={(e) => {
            e.preventDefault();
            drop(id);
            setDragId(null);
            setOverId(null);
          }}
          onDragEnd={() => {
            setDragId(null);
            setOverId(null);
          }}
          className={`relative group/sortable rounded-2xl transition-all ${dragId === id ? "opacity-40" : ""} ${
            overId === id && dragId && dragId !== id ? "ring-2 ring-sky-400/60" : ""
          }`}
        >
          <span
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-8 w-5 items-center justify-center rounded-md bg-zinc-800/90 text-zinc-400 opacity-0 group-hover/sortable:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
            title="Drag to reorder"
            aria-hidden="true"
          >
            <GripVertical className="h-4 w-4" />
          </span>
          {byId.get(id)}
        </div>
      ))}
    </div>
  );
}
