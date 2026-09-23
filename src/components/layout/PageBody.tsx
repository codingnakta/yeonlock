import type { ReactNode } from "react";

/** 좌우 24px 여백을 가진 본문 영역. 하단 고정 버튼이 있으면 그만큼 아래 여백을 둔다. */
export function PageBody({
  children,
  withBottomBar = false,
  className = "",
}: {
  children: ReactNode;
  withBottomBar?: boolean;
  className?: string;
}) {
  return (
    <main className={`flex-1 px-6 ${withBottomBar ? "pb-36" : "pb-12"} ${className}`}>
      {children}
    </main>
  );
}
