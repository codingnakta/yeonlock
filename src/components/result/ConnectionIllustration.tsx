/**
 * 두 개의 원이 겹치고 궤도가 연결된 인연 일러스트.
 * 얇은 선과 낮은 채도의 붉은 포인트만 사용한다.
 */
export function ConnectionIllustration({
  size = 220,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 220 158"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* 궤도 */}
      <ellipse cx="110" cy="80" rx="104" ry="44" stroke="#d9d2c6" strokeWidth="1" />
      <ellipse
        cx="110" cy="80" rx="104" ry="44"
        stroke="#c4776e" strokeWidth="1" strokeDasharray="3 7" strokeLinecap="round"
        transform="rotate(-14 110 80)"
        opacity="0.8"
      />
      {/* 두 원 */}
      <circle cx="82" cy="80" r="46" fill="#f4e8e3" fillOpacity="0.9" stroke="#1f1d1a" strokeWidth="1" />
      <circle cx="138" cy="80" r="46" fill="#efeae1" fillOpacity="0.6" stroke="#1f1d1a" strokeWidth="1" />
      {/* 겹치는 영역 강조 */}
      <path
        d="M110 40.3a46 46 0 0 1 0 79.4a46 46 0 0 1 0-79.4z"
        fill="#c4776e" fillOpacity="0.16"
      />
      {/* 궤도 위 점 */}
      <circle cx="16" cy="68" r="3" fill="#1f1d1a" />
      <circle cx="199" cy="103" r="2.5" fill="#c4776e" />
      <circle cx="110" cy="36" r="1.8" fill="#8c877f" />
    </svg>
  );
}
