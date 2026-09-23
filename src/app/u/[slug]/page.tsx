import type { Metadata } from "next";
import { PageBody } from "@/components/layout/PageBody";
import { BottomBar } from "@/components/layout/BottomBar";
import { LinkButton } from "@/components/ui/Button";
import { ConnectionIllustration } from "@/components/result/ConnectionIllustration";
import { MOCK_OWNER } from "@/lib/mock/data";

export async function generateMetadata({ params }: PageProps<"/u/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const nickname = slug === MOCK_OWNER.slug ? MOCK_OWNER.nickname : slug;
  return {
    title: `${nickname}님과 당신은 어떤 인연일까요?`,
    description: "연애·친구·귀인·협업·성장, 다섯 가지 인연으로 두 사람을 읽어드려요.",
  };
}

export default async function InviteLandingPage({ params }: PageProps<"/u/[slug]">) {
  const { slug } = await params;
  // PHASE 8 에서 slug → 소유자 닉네임 조회로 대체
  const nickname = slug === MOCK_OWNER.slug ? MOCK_OWNER.nickname : slug;

  return (
    <>
      <PageBody withBottomBar>
        <div className="pt-6">
          <span className="font-display text-[18px] text-ink">연록</span>
        </div>

        <h1 className="pt-24 font-display text-[36px] leading-[1.3] text-ink">
          {nickname}님과 당신은
          <br />
          어떤 인연일까요?
        </h1>

        <div className="flex justify-center py-16">
          <ConnectionIllustration size={240} />
        </div>

        <p className="text-[15px] leading-[1.75] text-ink-soft">
          생년월일을 입력하면 두 사람의 사주를 비교해
          <br />
          연애·친구·귀인·협업·성장 인연을 알려드려요.
          <br />
          <span className="text-mist">입력한 정보는 {nickname}님에게 공개되지 않아요.</span>
        </p>
      </PageBody>

      <BottomBar>
        <LinkButton href={`/u/${slug}/join`}>우리 인연 확인하기</LinkButton>
      </BottomBar>
    </>
  );
}
