"use client";

import { AXIS_LABELS } from "@/config/relationshipTypes";
import { RELATIONSHIP_AXES, type RelationshipAxis } from "@/types/compatibility";

export type RankingTab = "all" | RelationshipAxis;

export function RankingTabs({ value, onChange }: { value: RankingTab; onChange: (t: RankingTab) => void }) {
  const tabs: { id: RankingTab; label: string }[] = [
    { id: "all", label: "전체" },
    ...RELATIONSHIP_AXES.map((a) => ({ id: a, label: AXIS_LABELS[a] })),
  ];
  return (
    <div role="tablist" className="-mx-6 flex gap-1 overflow-x-auto px-6 [scrollbar-width:none]">
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`shrink-0 rounded-pill px-4 py-2 text-[14px] transition ${
              active ? "bg-ink text-ivory" : "text-mist hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
