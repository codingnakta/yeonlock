import { SPECIAL_TAG_LABELS } from "@/config/relationshipTypes";
import type { SpecialTagId } from "@/types/compatibility";

export function SpecialTag({ tag }: { tag: SpecialTagId }) {
  return (
    <span className="inline-flex h-8 items-center rounded-pill border border-rose/50 bg-rose-bg px-3 text-[13px] text-rose">
      {SPECIAL_TAG_LABELS[tag]}
    </span>
  );
}
