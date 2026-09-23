/** 궁합 계산 중 화면. 궤도 위를 도는 점과 문장 한 줄. */
export function LoadingAnalysis({ message = "두 사람의 사주를 읽고 있어요" }: { message?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-20">
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden>
        <circle cx="62" cy="80" r="34" stroke="#1f1d1a" strokeWidth="1" />
        <circle cx="98" cy="80" r="34" stroke="#1f1d1a" strokeWidth="1" />
        <ellipse cx="80" cy="80" rx="74" ry="30" stroke="#d9d2c6" strokeWidth="1" />
        <g className="orbit-spin">
          <circle cx="154" cy="80" r="3.5" fill="#c4776e" />
        </g>
      </svg>
      <p className="soft-pulse text-[15px] text-ink-soft">{message}</p>
    </div>
  );
}
