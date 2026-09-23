"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ShareButtonProps {
  title: string;
  text?: string;
  /** 절대 URL. 없으면 현재 주소 */
  url?: string;
  label?: string;
  variant?: "primary" | "secondary";
}

export function ShareButton({ title, text, url, label = "결과 공유하기", variant = "primary" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const target = url ?? window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: target });
        return;
      } catch {
        // 사용자가 취소한 경우 등: 복사로 대체
      }
    }
    try {
      await navigator.clipboard.writeText(target);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("링크를 복사하세요", target);
    }
  }

  return (
    <Button variant={variant} onClick={share}>
      {copied ? "링크를 복사했어요" : label}
    </Button>
  );
}
