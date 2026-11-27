import { ArrowDown, ArrowUp } from "lucide-react";
import { moveItemAction } from "@/actions/ordering";
import type { OrderableKind } from "@/lib/ordering";

/** Up/down controls for a list row. Plain forms, so they work without client JS. */
export function ReorderButtons({
  kind,
  id,
  isFirst,
  isLast,
}: {
  kind: OrderableKind;
  id: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const base =
    "p-1.5 rounded-md border border-zinc-800 text-zinc-400 hover:text-sky-400 hover:border-zinc-700 transition-colors disabled:opacity-30 disabled:pointer-events-none";
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Change order">
      <form action={moveItemAction.bind(null, kind, id, "up")}>
        <button type="submit" disabled={isFirst} title="Move up" aria-label="Move up" className={base}>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </form>
      <form action={moveItemAction.bind(null, kind, id, "down")}>
        <button type="submit" disabled={isLast} title="Move down" aria-label="Move down" className={base}>
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
