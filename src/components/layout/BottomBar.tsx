import type { ReactNode } from "react";

/** 화면 하단 고정 버튼 영역 (셸 폭 안에서만 고정). */
export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10">
      <div className="pointer-events-auto mx-auto w-full max-w-[430px] bg-gradient-to-t from-ivory via-ivory/95 to-transparent px-6 pb-[max(20px,env(safe-area-inset-bottom))] pt-8">
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
}
