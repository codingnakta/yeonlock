import type { ReactNode } from "react";

/** 430px 중앙 고정 모바일 셸. PC 에서도 가운데 앱 화면처럼 보인다. */
export function MobileLayout({ children }: { children: ReactNode }) {
  return <div className="app-shell flex flex-col">{children}</div>;
}
