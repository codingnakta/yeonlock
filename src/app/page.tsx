import Link from "next/link";
import { PageBody } from "@/components/layout/PageBody";
import { BottomBar } from "@/components/layout/BottomBar";
import { LinkButton } from "@/components/ui/Button";
import { ConnectionIllustration } from "@/components/result/ConnectionIllustration";

export default function HomePage() {
  return (
    <>
      <PageBody withBottomBar>
        <div className="flex items-center justify-between pt-6">
          <span className="font-display text-[18px] text-ink">연록</span>
          <Link href="/me" className="text-[14px] text-mist hover:text-ink">
            내 페이지
          </Link>
        </div>

        <div className="pt-20">
          <p className="text-[15px] text-mist">궁합 점수 대신,</p>
          <h1 className="mt-3 font-display text-[40px] leading-[1.25] text-ink">
            우리는
            <br />
            어떤 인연일까.
          </h1>
        </div>

        <div className="flex justify-center py-16">
          <ConnectionIllustration size={260} />
        </div>

        <p className="text-[16px] leading-[1.75] text-ink-soft">
          내 사주를 등록하고 링크를 나눠보세요.
          <br />
          친구, 연인, 동료가 링크로 들어오면
          <br />
          연애·친구·귀인·협업·성장,
          <br />
          다섯 가지 인연으로 두 사람을 읽어드려요.
        </p>
      </PageBody>

      <BottomBar>
        <LinkButton href="/create">내 사주 등록하고 링크 만들기</LinkButton>
      </BottomBar>
    </>
  );
}
