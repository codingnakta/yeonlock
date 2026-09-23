import { TopNavigation } from "@/components/layout/TopNavigation";
import { PageBody } from "@/components/layout/PageBody";
import { BottomBar } from "@/components/layout/BottomBar";
import { LinkButton } from "@/components/ui/Button";
import { CompatibilitySummary } from "@/components/result/CompatibilitySummary";
import { RelationshipScoreBar } from "@/components/result/RelationshipScoreBar";
import { ShareButton } from "@/components/share/ShareButton";
import { AXIS_LABELS } from "@/config/relationshipTypes";
import { RELATIONSHIP_AXES, type RelationshipAxis } from "@/types/compatibility";
import { MOCK_RESULT } from "@/lib/mock/data";

export const metadata = { title: "인연 결과" };

const AXIS_INTRO: Record<RelationshipAxis, string> = {
  romance: "연애로는",
  friendship: "친구로는",
  benefactor: "귀인으로는",
  teamwork: "협업으로는",
  growth: "성장 인연으로는",
};

export default async function ResultPage({ params }: PageProps<"/result/[id]">) {
  await params; // PHASE 8 에서 id 로 결과 조회
  const r = MOCK_RESULT;
  const scoreOf = (axis: RelationshipAxis) =>
    axis === "benefactor" ? r.scores.benefactor.total : r.scores[axis];

  // 가장 높은 두 축을 강조
  const topAxes = [...RELATIONSHIP_AXES].sort((a, b) => scoreOf(b) - scoreOf(a)).slice(0, 2);

  return (
    <>
      <TopNavigation backHref="/" />
      <PageBody withBottomBar>
        <CompatibilitySummary
          ownerNickname={r.ownerNickname}
          visitorNickname={r.visitorNickname}
          classification={r.classification}
          typeDescription={r.interpretation?.typeDescription ?? ""}
        />

        <div className="hairline my-10" />

        <section className="flex flex-col gap-6">
          {RELATIONSHIP_AXES.map((axis, i) => (
            <RelationshipScoreBar
              key={axis}
              label={AXIS_LABELS[axis]}
              value={scoreOf(axis)}
              emphasized={topAxes.includes(axis)}
              delayMs={i * 90}
              sub={
                axis === "benefactor"
                  ? `${r.ownerNickname} → ${r.visitorNickname} ${r.scores.benefactor.aToB} · ${r.visitorNickname} → ${r.ownerNickname} ${r.scores.benefactor.bToA}`
                  : undefined
              }
            />
          ))}
        </section>

        <div className="hairline my-10" />

        <p className="font-display text-[24px] leading-[1.5] text-ink">
          “{r.interpretation?.oneLiner}”
        </p>

        <div className="hairline my-10" />

        <section className="flex flex-col gap-8">
          {RELATIONSHIP_AXES.map((axis) => (
            <div key={axis} className="flex flex-col gap-2">
              <span className="text-[13px] text-mist">{AXIS_INTRO[axis]}</span>
              <p className="text-[16px] leading-[1.75] text-ink-soft">
                “{r.interpretation?.details[axis]}”
              </p>
            </div>
          ))}
        </section>
      </PageBody>

      <BottomBar>
        <ShareButton title={`${r.ownerNickname} × ${r.visitorNickname}, ${r.interpretation?.oneLiner ?? ""}`} />
        <LinkButton href="/create" variant="secondary">
          나도 내 인연 링크 만들기
        </LinkButton>
      </BottomBar>
    </>
  );
}
