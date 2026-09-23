"use client";

import { useMemo, useState } from "react";
import { RankingTabs, type RankingTab } from "@/components/ranking/RankingTabs";
import { RankingItem } from "@/components/ranking/RankingItem";
import { RankingTopSummary, type TopByAxis } from "@/components/ranking/RankingTopSummary";
import { RELATIONSHIP_AXES } from "@/types/compatibility";
import type { RankingEntry } from "@/types/profile";

function scoreFor(e: RankingEntry, tab: RankingTab): number {
  return tab === "all" ? e.total : e[tab];
}

export function RankingView({ entries }: { entries: RankingEntry[] }) {
  const [tab, setTab] = useState<RankingTab>("all");

  const top: TopByAxis = useMemo(() => {
    const out: TopByAxis = {};
    for (const axis of RELATIONSHIP_AXES) {
      const best = [...entries].sort((a, b) => b[axis] - a[axis])[0];
      if (best) out[axis] = { nickname: best.nickname, score: best[axis] };
    }
    return out;
  }, [entries]);

  const sorted = useMemo(
    () => [...entries].sort((a, b) => scoreFor(b, tab) - scoreFor(a, tab)),
    [entries, tab],
  );

  return (
    <div className="flex flex-col">
      <RankingTopSummary top={top} />

      <div className="mt-10">
        <RankingTabs value={tab} onChange={setTab} />
      </div>

      <ul className="mt-4 divide-y divide-ivory-line">
        {sorted.map((e, i) => (
          <li key={e.resultId}>
            <RankingItem
              rank={i + 1}
              nickname={e.nickname}
              type={e.relationshipType}
              score={scoreFor(e, tab)}
              href={`/result/${e.resultId}`}
            />
          </li>
        ))}
      </ul>

      {entries.length === 0 ? (
        <p className="py-16 text-center text-[15px] text-mist">
          아직 다녀간 인연이 없어요.
          <br />
          링크를 공유해 보세요.
        </p>
      ) : null}
    </div>
  );
}
