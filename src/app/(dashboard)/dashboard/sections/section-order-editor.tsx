"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Check, Eye, EyeOff, ExternalLink, GripVertical, Loader2, Lock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { saveSectionOrderAction } from "@/actions/ordering";
import { SECTION_META, type SectionKey } from "@/lib/sections";

type Props = {
  initial: SectionKey[];
  initialHidden: SectionKey[];
  templateDefault: SectionKey[];
  templateName: string;
  isCustom: boolean;
  handle: string;
};

function Fixed({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-dashed border-zinc-800 px-4 py-3 text-sm text-zinc-500">
      <Lock className="h-4 w-4" />
      <span>{label}</span>
    </li>
  );
}

const iconBtn =
  "p-1.5 rounded-md border border-zinc-800 text-zinc-400 hover:text-sky-400 disabled:opacity-30 disabled:pointer-events-none";

export function SectionOrderEditor({ initial, initialHidden, templateDefault, templateName, isCustom, handle }: Props) {
  const [order, setOrder] = useState<SectionKey[]>(initial);
  const [hidden, setHidden] = useState<SectionKey[]>(initialHidden);
  const [saved, setSaved] = useState({ order: initial, hidden: initialHidden });
  const [custom, setCustom] = useState(isCustom);
  const [pending, startTransition] = useTransition();
  const [justSaved, setJustSaved] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const dirty = order.join() !== saved.order.join() || [...hidden].sort().join() !== [...saved.hidden].sort().join();
  const isDefault = order.join() === templateDefault.join() && hidden.length === 0;

  const edit = (next: SectionKey[]) => {
    setOrder(next);
    setJustSaved(false);
  };

  const move = (from: number, to: number) => {
    if (from === to || to < 0 || to >= order.length) return;
    const next = [...order];
    next.splice(to, 0, next.splice(from, 1)[0]);
    edit(next);
  };

  const toggleHidden = (key: SectionKey) => {
    setHidden((h) => (h.includes(key) ? h.filter((k) => k !== key) : [...h, key]));
    setJustSaved(false);
  };

  const persist = (nextOrder: SectionKey[], nextHidden: SectionKey[], reset = false) => {
    startTransition(async () => {
      await saveSectionOrderAction(reset ? [] : nextOrder, nextHidden);
      setSaved({ order: nextOrder, hidden: nextHidden });
      setCustom(!reset || nextHidden.length > 0);
      setJustSaved(true);
    });
  };

  const reset = () => {
    setOrder(templateDefault);
    setHidden([]);
    persist(templateDefault, [], true);
  };

  const visibleCount = order.length - hidden.length;

  return (
    <Card className="p-6 space-y-5">
      <p className="text-xs text-zinc-400">
        {custom
          ? "You're using a custom layout."
          : `Using the default layout for ${templateName}. Drag a section, or use the arrows, to make it your own.`}
      </p>

      <ol className="space-y-2">
        <Fixed label="Intro / profile (always first)" />
        {order.map((key, i) => {
          const isHidden = hidden.includes(key);
          return (
            <li
              key={key}
              draggable
              onDragStart={(e) => {
                setDragIndex(i);
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", key); // Firefox needs data to start a drag
              }}
              onDragOver={(e) => {
                if (dragIndex === null) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (overIndex !== i) setOverIndex(i);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIndex !== null) move(dragIndex, i);
                setDragIndex(null);
                setOverIndex(null);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              className={`flex items-center gap-3 rounded-xl border bg-zinc-950/40 px-3 py-3 transition-all ${
                dragIndex === i ? "opacity-40" : ""
              } ${
                overIndex === i && dragIndex !== null && dragIndex !== i
                  ? "border-sky-400 ring-2 ring-sky-400/30"
                  : "border-zinc-800"
              }`}
            >
              <span
                className="cursor-grab active:cursor-grabbing text-zinc-500 hover:text-zinc-300 touch-none"
                aria-hidden="true"
                title="Drag to reorder"
              >
                <GripVertical className="h-5 w-5" />
              </span>
              <span className="w-5 text-center text-xs font-mono text-sky-400">{i + 1}</span>
              <div className={`min-w-0 flex-1 ${isHidden ? "opacity-50" : ""}`}>
                <p className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                  {SECTION_META[key].label}
                  {isHidden && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 border border-amber-500/30 rounded px-1.5 py-0.5">
                      Hidden
                    </span>
                  )}
                </p>
                <p className="text-xs text-zinc-500 truncate">{SECTION_META[key].description}</p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => toggleHidden(key)}
                  aria-pressed={isHidden}
                  aria-label={`${isHidden ? "Show" : "Hide"} ${SECTION_META[key].label}`}
                  title={isHidden ? "Show on home page" : "Hide from home page"}
                  className={iconBtn}
                >
                  {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i - 1)}
                  disabled={i === 0 || pending}
                  aria-label={`Move ${SECTION_META[key].label} up`}
                  className={iconBtn}
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, i + 1)}
                  disabled={i === order.length - 1 || pending}
                  aria-label={`Move ${SECTION_META[key].label} down`}
                  className={iconBtn}
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </li>
          );
        })}
        <Fixed label="Contact banner (always last)" />
      </ol>

      <p className="text-xs text-zinc-500">
        {visibleCount} of {order.length} sections shown. Hidden sections are removed from your main page only — their
        own pages (like /projects) stay available. Only sections with featured items appear.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() => persist(order, hidden)}
          disabled={!dirty || pending}
          className="h-10 px-5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-sm font-semibold"
        >
          {pending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Save layout
        </Button>
        <Button
          variant="outline"
          onClick={reset}
          disabled={pending || (isDefault && !custom)}
          className="h-10 rounded-xl"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to default
        </Button>
        {justSaved && !dirty && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        )}
        <a
          href={`/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 text-xs text-sky-400 hover:underline"
        >
          View portfolio <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </Card>
  );
}
