import { ConnectionIllustration } from "./ConnectionIllustration";
import { RelationshipTypeBadge } from "./RelationshipTypeBadge";
import { SpecialTag } from "./SpecialTag";
import type { Classification } from "@/types/compatibility";

interface CompatibilitySummaryProps {
  ownerNickname: string;
  visitorNickname: string;
  classification: Classification;
  typeDescription: string;
}

/** 결과 페이지 상단: 헤드라인, 일러스트, 대표 유형, 태그, 설명 */
export function CompatibilitySummary({
  ownerNickname,
  visitorNickname,
  classification,
  typeDescription,
}: CompatibilitySummaryProps) {
  return (
    <section className="flex flex-col">
      <h1 className="pt-4 text-[26px] font-medium leading-[1.4] text-ink">
        {ownerNickname}님과 {visitorNickname}님은
        <br />
        이런 인연이에요.
      </h1>

      <div className="flex justify-center py-8">
        <ConnectionIllustration />
      </div>

      <div className="flex flex-col gap-4">
        <RelationshipTypeBadge type={classification.type} />
        {classification.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {classification.tags.map((t) => (
              <SpecialTag key={t} tag={t} />
            ))}
          </div>
        ) : null}
        <p className="whitespace-pre-line text-[16px] leading-[1.7] text-ink-soft">{typeDescription}</p>
      </div>
    </section>
  );
}
