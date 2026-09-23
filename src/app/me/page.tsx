import Link from "next/link";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { PageBody } from "@/components/layout/PageBody";
import { InviteLinkButton } from "@/components/share/InviteLinkButton";
import { MOCK_OWNER, MOCK_RANKING } from "@/lib/mock/data";

export const metadata = { title: "내 페이지" };

export default function MePage() {
  const url = `https://yeonrok.app/u/${MOCK_OWNER.slug}`;
  const count = MOCK_RANKING.length;

  return (
    <>
      <TopNavigation backHref="/" />
      <PageBody>
        <h1 className="pt-4 font-display text-[32px] leading-[1.3] text-ink">{MOCK_OWNER.nickname}</h1>
        <p className="mt-2 text-[15px] text-mist">지금까지 {count}명의 인연이 다녀갔어요.</p>

        <div className="mt-12">
          <span className="text-[13px] text-mist">내 인연 링크</span>
          <div className="mt-3">
            <InviteLinkButton url={url} ownerNickname={MOCK_OWNER.nickname} />
          </div>
        </div>

        <div className="hairline my-10" />

        <Link href="/me/ranking" className="flex items-center justify-between py-2">
          <div className="flex flex-col gap-1">
            <span className="text-[17px] font-medium text-ink">인연 랭킹</span>
            <span className="text-[13px] text-mist">누가 나와 가장 잘 맞는지 확인해요</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="m7.5 4 6 6-6 6" stroke="#8c877f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </PageBody>
    </>
  );
}
