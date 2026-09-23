import { TopNavigation } from "@/components/layout/TopNavigation";
import { PageBody } from "@/components/layout/PageBody";

export const metadata = { title: "로그인" };

export default function LoginPage() {
  return (
    <>
      <TopNavigation backHref="/" />
      <PageBody>
        <h1 className="pt-4 text-[26px] font-medium leading-[1.4] text-ink">
          내 인연 링크를
          <br />
          만들려면 로그인이 필요해요.
        </h1>
        <p className="mt-3 text-[15px] leading-[1.7] text-mist">
          방금 입력한 사주 정보는 로그인 후 그대로 이어져요.
        </p>
        <div className="mt-12 rounded-2xl border border-dashed border-ivory-line p-6 text-center text-[14px] text-mist">
          Google · 카카오 로그인은 PHASE 7에서 연결합니다.
        </div>
      </PageBody>
    </>
  );
}
