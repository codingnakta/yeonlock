"use client";

import { useState } from "react";

/** 내 인연 링크를 보여주고 복사/공유하는 버튼 */
export function InviteLinkButton({ url, ownerNickname }: { url: string; ownerNickname: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("링크를 복사하세요", url);
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${ownerNickname}님과 당신은 어떤 인연일까요?`, url });
        return;
      } catch {
        // 취소
      }
    }
    await copy();
  }

  const display = url.replace(/^https?:\/\//, "");

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={copy}
        className="flex h-14 items-center justify-between rounded-2xl border border-ivory-line bg-ivory-deep/60 px-4 text-left transition hover:border-ink/30"
      >
        <span className="truncate text-[15px] text-ink">{display}</span>
        <span className="shrink-0 pl-3 text-[13px] text-mist">{copied ? "복사됨" : "복사"}</span>
      </button>
      <button
        onClick={share}
        className="inline-flex h-14 w-full items-center justify-center rounded-pill bg-ink text-[16px] font-medium text-ivory transition hover:bg-ink-soft active:scale-[0.99]"
      >
        링크 공유하기
      </button>
    </div>
  );
}
