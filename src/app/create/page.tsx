import { TopNavigation } from "@/components/layout/TopNavigation";
import { PageBody } from "@/components/layout/PageBody";

export const metadata = { title: "내 사주 등록" };

export default function CreatePage() {
  return (
    <>
      <TopNavigation backHref="/" />
      <PageBody withBottomBar>
        <h1 className="pt-4 text-[26px] font-medium leading-[1.4] text-ink">
          내 사주를
          <br />
          알려주세요.
        </h1>
        <p className="mt-3 text-[15px] leading-[1.7] text-mist">
          입력한 생년월일과 시간은 다른 사람에게 공개되지 않아요.
        </p>
        <div className="mt-12 rounded-2xl border border-dashed border-ivory-line p-6 text-center text-[14px] text-mist">
          생년월일시 입력 폼은 PHASE 2에서 구현합니다.
        </div>
      </PageBody>
    </>
  );
}
