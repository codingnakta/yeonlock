import Link from "next/link";
import type { ReactNode } from "react";

interface TopNavigationProps {
  title?: string;
  /** 뒤로가기 링크. 없으면 버튼 자리를 비워 둔다. */
  backHref?: string;
  right?: ReactNode;
}

export function TopNavigation({ title, backHref, right }: TopNavigationProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-ivory/90 px-2 backdrop-blur-sm">
      <div className="flex w-12 items-center">
        {backHref ? (
          <Link
            href={backHref}
            aria-label="뒤로"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-ivory-deep"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M12.5 4 6.5 10l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : null}
      </div>
      <h1 className="text-[15px] font-medium text-ink">{title}</h1>
      <div className="flex w-12 items-center justify-end pr-2">{right}</div>
    </header>
  );
}
