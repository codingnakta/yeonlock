interface RelationshipScoreBarProps {
  label: string;
  value: number;
  /** 귀인처럼 방향성이 있을 때 보조 표기 */
  sub?: string;
  emphasized?: boolean;
  delayMs?: number;
}

export function RelationshipScoreBar({ label, value, sub, emphasized = false, delayMs = 0 }: RelationshipScoreBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className={`text-[15px] ${emphasized ? "font-medium text-ink" : "text-ink-soft"}`}>{label}</span>
        <span className={`font-display text-[22px] leading-none ${emphasized ? "text-rose" : "text-ink"}`}>
          {clamped}
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-ivory-line">
        <div
          className={`bar-fill h-full rounded-full ${emphasized ? "bg-rose" : "bg-ink"}`}
          style={{ width: `${clamped}%`, animationDelay: `${delayMs}ms` }}
        />
      </div>
      {sub ? <span className="text-[12px] text-mist">{sub}</span> : null}
    </div>
  );
}
