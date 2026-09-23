import { TopNavigation } from "@/components/layout/TopNavigation";
import { PageBody } from "@/components/layout/PageBody";
import { RankingView } from "./RankingView";
import { MOCK_OWNER, MOCK_RANKING } from "@/lib/mock/data";

export const metadata = { title: "인연 랭킹" };

export default function RankingPage() {
  const entries = MOCK_RANKING; // PHASE 9 에서 DB 조회로 대체

  return (
    <>
      <TopNavigation backHref="/me" />
      <PageBody>
        <h1 className="pt-4 text-[26px] font-medium leading-[1.4] text-ink">
          {MOCK_OWNER.nickname}님의
          <br />
          인연 랭킹
        </h1>
        <p className="mt-3 text-[15px] text-mist">지금까지 {entries.length}명의 인연이 다녀갔어요.</p>

        <div className="mt-10">
          <RankingView entries={entries} />
        </div>
      </PageBody>
    </>
  );
}
