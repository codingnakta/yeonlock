/** 라벨 + 숫자만 보여주는 컴팩트 점수. 랭킹 요약 등에 사용. */
export function RelationshipScore({
  label,
  value,
  caption,
}: {
  label: string;
  value: number;
  caption?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[12px] text-mist">{label}</span>
      <span className="font-display text-[26px] leading-none text-ink">{value}</span>
      {caption ? <span className="text-[13px] text-ink-soft">{caption}</span> : null}
    </div>
  );
}
