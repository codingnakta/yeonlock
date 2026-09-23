import Link from "next/link";
import { RelationshipTypeBadge } from "@/components/result/RelationshipTypeBadge";
import type { RelationshipTypeId } from "@/types/compatibility";

interface RankingItemProps {
  rank: number;
  nickname: string;
  type: RelationshipTypeId;
  score: number;
  href: string;
}

export function RankingItem({ rank, nickname, type, score, href }: RankingItemProps) {
  return (
    <Link
      href={href}
      className="-mx-2 flex items-center gap-4 rounded-xl px-2 py-4 transition hover:bg-ivory-deep/60"
    >
      <span className={`w-6 font-display text-[18px] ${rank <= 3 ? "text-rose" : "text-mist-light"}`}>{rank}</span>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[16px] font-medium text-ink">{nickname}</span>
        <RelationshipTypeBadge type={type} size="sm" />
      </div>
      <span className="font-display text-[24px] text-ink">{score}</span>
    </Link>
  );
}
