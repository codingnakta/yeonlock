import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MobileLayout } from "@/components/layout/MobileLayout";

export const metadata: Metadata = {
  title: { default: "연록", template: "%s · 연록" },
  description: "우리는 어떤 인연일까. 사주로 읽는 두 사람의 관계.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f4ee",
};

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Gowun+Batang:wght@400;700&display=swap";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <head>
        {/* 빌드 시 폰트 다운로드에 의존하지 않도록 브라우저에서 직접 로드한다. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_HREF} />
      </head>
      <body>
        <MobileLayout>{children}</MobileLayout>
      </body>
    </html>
  );
}
