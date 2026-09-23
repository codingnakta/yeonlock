import { TopNavigation } from "@/components/layout/TopNavigation";
import { PageBody } from "@/components/layout/PageBody";
import { MOCK_OWNER } from "@/lib/mock/data";

export const metadata = { title: "내 정보 입력" };

export default async function JoinPage({ params }: PageProps<"/u/[slug]/join">) {
  const { slug } = await params;
  const nickname = slug === MOCK_OWNER.slug ? MOCK_OWNER.nickname : slug;

  return (
    <>
      <TopNavigation backHref={`/u/${slug}`} />
      <PageBody withBottomBar>
        <h1 className="pt-4 text-[26px] font-medium leading-[1.4] text-ink">
          {nickname}님과의 인연을 보려면
          <br />
          당신의 사주가 필요해요.
        </h1>
        <p className="mt-3 text-[15px] leading-[1.7] text-mist">
          생년월일과 시간은 {nickname}님에게 공개되지 않아요.
        </p>
        <div className="mt-12 rounded-2xl border border-dashed border-ivory-line p-6 text-center text-[14px] text-mist">
          생년월일시 입력 폼은 PHASE 2에서 구현합니다.
        </div>
      </PageBody>
    </>
  );
}
