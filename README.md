# 연록

사주 기반 인연 분석 모바일 웹서비스 MVP.

## 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm run test       # 엔진 단위 테스트
npm run typecheck
```

## 구조

- `src/app` 페이지 (App Router)
- `src/components` UI 컴포넌트
- `src/lib/saju` 사주팔자 계산 엔진 (순수 함수)
- `src/lib/compatibility` 궁합 엔진 (순수 함수)
- `src/config` 가중치·분류 규칙 설정
- `src/types` 공용 타입
- `supabase/migrations` DB 스키마
- `tests` 엔진 테스트
