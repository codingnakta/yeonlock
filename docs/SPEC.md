# 연록 MVP 기획서

모바일 퍼스트 사주 기반 인연 분석 웹서비스 **연록**의 MVP 기획서. (2026-09-23 작성)

이 서비스는 일반적인 "궁합 몇 점" 서비스가 아니다. 사용자가 자신의 사주 정보를 등록하고 개인 링크를 만든 뒤, 친구·연인·지인에게 링크를 공유하면 상대방이 자신의 사주 정보를 입력한다. 두 사람의 사주를 비교하여 **연애 / 친구 / 귀인 / 협업 / 성장** 5가지 관계별 궁합을 분석하고, 어떤 관계로 만났을 때 가장 잘 맞는지 보여준다. 여러 사람이 사용자의 링크에 참여하면 사용자는 자신의 페이지에서 **인연 랭킹**을 확인할 수 있다.

## 1. 핵심 사용자 경험

핵심 질문은 "우리 궁합은 몇 점일까?"가 아니라 **"우리는 어떤 인연일까?"**이다.

예:

> 다연 × 수빈
> 친구 + 귀인형
> "편해서 찾게 되고, 중요한 순간에는 도움이 되는 사람."
> 연애 68 · 친구 94 · 귀인 91 · 협업 82 · 성장 79
> #상호귀인 #오래가는사이

## 2. 서비스 플로우

### A. 내가 처음 서비스를 사용하는 경우

홈 → 내 사주 정보 입력 → 내 개인 인연 링크 생성 (예: /u/dayeon) → 링크 복사/공유 → 친구들이 링크를 통해 참여 → 내 인연 랭킹에 결과가 누적됨

### B. 친구가 공유 링크로 들어온 경우

/u/dayeon 첫 화면: "다연님과 당신은 어떤 인연일까요?" [우리 인연 확인하기]
→ 자신의 정보 입력 → 사주 계산 → 두 사람의 궁합 분석 → 결과 페이지 → "나도 내 인연 링크 만들기" 버튼 제공.
방금 입력한 정보를 다시 입력하지 않고 자신의 링크를 생성할 수 있도록 한다.

## 3. 사용자 입력 정보

필수: 닉네임, 생년월일, 성별, 양력/음력
선택: 태어난 시간, "태어난 시간을 몰라요"

- MVP에서는 출생 지역 및 진태양시 보정은 사용하지 않는다. 한국 표준시 기준으로 처리한다.
- 친구가 입력한 실제 생년월일과 태어난 시간은 링크 소유자에게 공개하지 않는다.
- 링크 소유자는 상대방의 닉네임, 인연 유형, 관계별 점수, 결과만 확인할 수 있다.

## 4. 핵심 궁합 영역

- **연애**: 이성적 끌림, 감정 교류, 연애 관계의 조화
- **친구**: 편안함, 대화, 함께 있을 때의 자연스러움
- **귀인**: 한 사람이 다른 사람에게 좋은 영향, 도움, 보완을 주는 관계. 반드시 방향성을 지원한다. (예: A → B 귀인도 91, B → A 귀인도 57)
- **협업**: 같이 일하거나 프로젝트를 진행했을 때의 역할 보완과 조화
- **성장**: 반드시 편안한 관계를 의미하지 않는다. 서로에게 자극을 주고 변화나 성장을 만드는 관계

## 5. 인연 유형

5가지 관계 점수를 기반으로 대표 인연 유형을 결정한다.

- 조합형: 친구 + 귀인형, 연애 + 친구형, 연애 + 성장형, 연애 + 귀인형, 친구 + 성장형, 친구 + 협업형, 귀인 + 성장형, 귀인 + 협업형, 협업 + 성장형, 연애 + 협업형
- 단일형: 연애형, 친구형, 귀인형, 협업형, 성장형
- 전체적으로 높으면: 전천후 인연
- 전체가 안정적으로 비슷하면: 균형형
- 귀인 방향성이 양쪽 모두 매우 높으면: 상호 귀인

대표 유형은 1개만 보여주고, 추가 조건을 만족하면 특별 태그를 최대 2개 보여준다. (예: 친구 + 귀인형 / #상호귀인 #오래가는사이)

## 6. 결과 페이지

모바일 결과 페이지를 가장 중요하게 디자인한다.

- 상단: "다연님과 지훈님은 이런 인연이에요." 옆 또는 아래에 두 개의 원이 겹치고 궤도가 연결된 추상적인 인연 일러스트
- 전체 디자인은 밝은 아이보리 배경. 전통 사주 서비스처럼 보이지 않도록 한다.
- 대표 결과: 유형 + 두 줄 설명
- 5개 점수 (연애/친구/귀인/협업/성장)
- 한 줄 결과 (예: "같이 있으면 생각이 커지는 사이.")
- 상세 분석: 연애로는 / 친구로는 / 귀인으로는 / 협업으로는 / 성장 인연으로는 각각 한 문장
- 하단 버튼: [결과 공유하기] [나도 내 인연 링크 만들기]

## 7. 내 인연 랭킹 페이지

- 상단: "다연님의 인연 랭킹", "지금까지 18명의 인연이 다녀갔어요."
- 상단 요약: 연애 1위 / 친구 1위 / 귀인 1위 / 협업 1위 / 성장 1위 (닉네임 + 점수)
- 카테고리 탭: 전체 / 연애 / 친구 / 귀인 / 협업 / 성장
- 리스트: 순위, 닉네임, 인연 유형, 점수. 각 항목을 누르면 해당 사람과의 상세 결과 페이지로 이동.

## 8. 궁합 계산 구조

AI가 생년월일만 보고 임의로 궁합을 판단하게 하지 않는다. 반드시 다음 구조로 분리한다.

Birth Data → Saju Engine → Person A/B Four Pillars → Compatibility Engine → Relationship Scores → Type Classifier → AI Interpretation

AI는 마지막 자연어 해석에만 사용한다.

## 9. 사주 엔진 (/lib/saju)

calculateFourPillars, calculateYearPillar, calculateMonthPillar, calculateDayPillar, calculateHourPillar, calculateElements, calculateTenGods.
생년월일시를 입력하면 년주·월주·일주·시주 8글자를 반환한다. 사주 계산 로직은 UI 코드와 완전히 분리한다.

## 10. 궁합 엔진 (/lib/compatibility)

calculateStemRelation, calculateBranchRelation, calculateElementBalance, calculateTenGodRelation, calculateCompatibility, calculateRelationshipScores, classifyRelationshipType.

분석 항목: 일간 관계, 일지 관계, 오행 생극 관계, 천간합, 지지 육합, 삼합, 충, 형, 파, 해, 십신 관계, 전체 오행 보완, 귀인 관계의 방향성.

결과 예: `{ romance: 68, friendship: 92, benefactor: { aToB: 88, bToA: 93, total: 90 }, teamwork: 76, growth: 84 }`

가중치는 별도 설정 파일(/config/compatibilityWeights.ts)에서 관리한다. 점수를 코드에 하드코딩하지 않는다.

## 11. 인연 타입 분류

예: friendship ≥ 85 && benefactor ≥ 85 → 친구 + 귀인형. romance ≥ 85 && growth ≥ 85 → 연애 + 성장형. 5개 점수 평균이 높고 표준편차가 작으면 → 전천후 인연. 분류 조건 역시 별도 config 파일에서 관리한다.

## 12. 데이터베이스 (Supabase)

테이블: users, profiles, invite_links, compatibility_results.

- profiles: id, user_id, nickname, birth_date, birth_time, birth_time_unknown, calendar_type, gender, created_at
- invite_links: id, owner_profile_id, slug, created_at, active
- compatibility_results: id, owner_profile_id, visitor_profile_id, romance_score, friendship_score, benefactor_a_to_b, benefactor_b_to_a, teamwork_score, growth_score, relationship_type, special_tags, created_at

민감한 출생 정보 접근 권한을 명확히 분리한다.

## 13. 로그인

처음 궁합을 보는 과정에서는 로그인하지 않아도 된다. "내 인연 링크 만들기"를 누르는 순간 로그인하도록 한다. 카카오 로그인 또는 Google 로그인. 로그인 없이 입력한 사주 정보는 로그인 후 해당 사용자 프로필로 연결한다.

## 14. 기술 스택

Next.js 최신 안정 버전, TypeScript, React, Tailwind CSS, Supabase, 모바일 퍼스트 반응형, App Router, Server Actions / Route Handler.

## 15. 디자인

기준 화면 390px 모바일, 최대 콘텐츠 폭 430px. PC에서는 가운데 모바일 레이아웃처럼 보이도록 한다.

분위기: 감성적, 차분함, 현대적, 약간 신비로움, 한국적 느낌은 아주 미세하게.

사용하지 않을 것: 전통 한지 UI, 붓글씨 남발, 태극 문양, 무당/점집 이미지, 보라색 네온, 과한 gradient, glassmorphism 남발, 모든 요소를 카드로 만드는 AI스러운 UI.

선호: 아이보리, 먹색, 회색, 채도가 낮은 붉은색 / 핑크 베이지 포인트, 큰 타이포그래피, 많은 여백, 얇은 선, 적은 수의 카드, 자연스러운 모바일 앱 느낌.

## 16. UI 컴포넌트

MobileLayout, TopNavigation, BirthDateInput, BirthTimeInput, CalendarTypeSelector, RelationshipScore, RelationshipScoreBar, RelationshipTypeBadge, SpecialTag, CompatibilitySummary, RankingTabs, RankingItem, ShareButton, InviteLinkButton, LoadingAnalysis.

## 17. 필요한 페이지

`/` 홈 · `/create` 내 사주 등록 · `/u/[slug]` 개인 인연 링크 랜딩 · `/u/[slug]/join` 방문자 사주 입력 · `/result/[id]` 궁합 결과 · `/me` 내 페이지 · `/me/ranking` 내 인연 랭킹

## 18. 개발 순서

1. PHASE 1 프로젝트 기본 구조와 모바일 UI 구축
2. PHASE 2 생년월일시 입력 폼 완성
3. PHASE 3 사주팔자 계산 엔진
4. PHASE 4 사주 엔진 테스트
5. PHASE 5 궁합 분석 엔진
6. PHASE 6 인연 유형 분류
7. PHASE 7 Supabase 연동
8. PHASE 8 개인 링크 생성 및 참여 구조
9. PHASE 9 인연 랭킹
10. PHASE 10 AI 자연어 해석

## 19. 개발 원칙

- 사주 계산 결과를 AI에게 맡기지 않는다. 궁합 점수도 AI가 임의로 생성하지 않는다.
- AI는 계산된 JSON 데이터를 자연스러운 한국어로 설명하는 역할만 한다.
- 모든 핵심 계산 함수에는 테스트 코드를 작성한다. 사주 경계 시간, 입춘, 절입 시각 등 경계값을 테스트할 수 있도록 설계한다.
- UI와 계산 로직과 DB 로직을 최대한 분리한다.
- MVP에서는 기능을 과도하게 추가하지 않는다. 결제, 커뮤니티, 오늘의 운세, 일반 사주풀이 등은 구현하지 않는다.
- 임의로 서비스 방향이나 기능을 추가하지 않고 위 기획을 기준으로 개발한다.
- UI는 SaaS 대시보드가 아니라 실제 소비자용 모바일 서비스처럼 디자인한다. 결과 페이지와 인연 랭킹 페이지의 완성도를 가장 중요하게 생각한다.
- 기능은 한 번에 하나씩(PHASE 단위) 구현하고, 컨펌을 받은 뒤 다음 단계로 진행한다.
