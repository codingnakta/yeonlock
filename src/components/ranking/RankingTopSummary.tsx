import { AXIS_LABELS } from "@/config/relationshipTypes";
import { RELATIONSHIP_AXES, type RelationshipAxis } from "@/types/compatibility";

export type TopByAxis = Partial<Record<RelationshipAxis, { nickname: string; score: number }>>;

/** 축별 1위 5칸. 데이터 없는 축은 비워 둔다. */
export function RankingTopSummary({ top }: { top: TopByAxis }) {
  return (
    <div className="-mx-6 flex gap-3 overflow-x-auto px-6 [scrollbar-width:none]">
      {RELATIONSHIP_AXES.map((axis) => {
        const t = top[axis];
        return (
          <div key={axis} className="flex w-[104px] shrink-0 flex-col gap-1 border-l border-ivory-line pl-3">
            <span className="text-[12px] text-mist">{AXIS_LABELS[axis]} 1위</span>
            <span className="truncate text-[15px] font-medium text-ink">{t ? t.nickname : "—"}</span>
            <span className="font-display text-[22px] leading-none text-ink">{t ? t.score : ""}</span>
          </div>
        );
      })}
    </div>
  );
}
