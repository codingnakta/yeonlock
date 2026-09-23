# 연록 설계안

2026-09-23 기획서(SPEC.md)를 바탕으로 구현 전에 합의한 설계. 코드가 바뀌면 이 문서도 함께 갱신한다.

## 1. 폴더 구조

```
sajuboja/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                  # 루트: 폰트, MobileLayout(430px 중앙 고정)
│  │  ├─ page.tsx                    # /              홈
│  │  ├─ create/page.tsx             # /create        내 사주 등록
│  │  ├─ login/page.tsx              # /login         "내 링크 만들기" 진입 시에만
│  │  ├─ u/[slug]/page.tsx           # /u/:slug       링크 랜딩
│  │  ├─ u/[slug]/join/page.tsx      # /u/:slug/join  방문자 입력
│  │  ├─ result/[id]/page.tsx        # /result/:id    궁합 결과
│  │  ├─ me/page.tsx                 # /me            내 페이지
│  │  ├─ me/ranking/page.tsx         # /me/ranking    인연 랭킹
│  │  ├─ auth/callback/route.ts      # OAuth 콜백 (PHASE 7)
│  │  └─ api/interpret/route.ts      # AI 해석 (PHASE 10)
│  ├─ components/
│  │  ├─ layout/    MobileLayout, TopNavigation, PageBody, BottomBar
│  │  ├─ ui/        Button, LinkButton
│  │  ├─ form/      BirthDateInput, BirthTimeInput, CalendarTypeSelector, GenderSelector, BirthForm
│  │  ├─ result/    RelationshipScore, RelationshipScoreBar, RelationshipTypeBadge, SpecialTag,
│  │  │             CompatibilitySummary, ConnectionIllustration, LoadingAnalysis
│  │  ├─ ranking/   RankingTabs, RankingItem, RankingTopSummary
│  │  └─ share/     ShareButton, InviteLinkButton
│  ├─ lib/
│  │  ├─ saju/            # 사주 엔진. 순수 함수, UI/DB 의존 없음
│  │  ├─ compatibility/   # 궁합 엔진. 순수 함수
│  │  ├─ interpretation/  # buildPrompt.ts, interpret.ts, fallbackTemplates.ts
│  │  ├─ supabase/        # client.ts(브라우저), server.ts(쿠키 세션), admin.ts(service role)
│  │  ├─ actions/         # Server Actions: profile.ts, inviteLink.ts, compatibility.ts
│  │  ├─ queries/         # 읽기 전용: ranking.ts, result.ts, landing.ts
│  │  └─ mock/            # PHASE 1 목업. PHASE 7~9 에서 삭제
│  ├─ config/
│  │  ├─ compatibilityWeights.ts   # 축별 가중치
│  │  ├─ relationshipTypes.ts      # 유형 라벨 + 분류 임계값
│  │  ├─ specialTags.ts            # 특별 태그 조건·우선순위
│  │  └─ sajuOptions.ts            # 일주 경계, 오행 가중치
│  ├─ types/   saju.ts, compatibility.ts, profile.ts, database.ts
│  └─ app/globals.css               # 디자인 토큰
├─ supabase/migrations/0001_init.sql
├─ tests/  saju/, compatibility/          # vitest
└─ docs/   SPEC.md, DESIGN.md, DECISIONS.md
```

## 2. 주요 타입

실제 정의는 `src/types/*.ts`. 요약:

```ts
// saju.ts
type Stem = '甲'|'乙'|'丙'|'丁'|'戊'|'己'|'庚'|'辛'|'壬'|'癸'
type Branch = '子'|'丑'|'寅'|'卯'|'辰'|'巳'|'午'|'未'|'申'|'酉'|'戌'|'亥'
type Element = 'wood'|'fire'|'earth'|'metal'|'water'
type TenGod = '比肩'|'劫財'|'食神'|'傷官'|'偏財'|'正財'|'偏官'|'正官'|'偏印'|'正印'
interface Pillar { stem: Stem; branch: Branch }
interface FourPillars { year; month; day; hour: Pillar | null }   // 시간 모름이면 null
interface BirthInput { birthDate: 'YYYY-MM-DD'; birthTime: 'HH:mm' | null; birthTimeUnknown; calendarType: 'solar'|'lunar'; isLeapMonth; gender }
interface SajuChart { pillars; dayMaster: Stem; dayMasterElement; elements: ElementBalance; tenGods; hasHour }

// compatibility.ts
type RelationshipAxis = 'romance'|'friendship'|'benefactor'|'teamwork'|'growth'
interface BenefactorScore { aToB; bToA; total }         // aToB = owner → visitor
interface RelationshipScores { romance; friendship; benefactor: BenefactorScore; teamwork; growth }
interface CompatibilityAnalysis { dayStem: StemRelation; dayBranch: BranchRelation; crossBranches; elements: ElementComplement; tenGods: { aSeesB; bSeesA } }
type RelationshipTypeId = 10개 조합형 | 5개 단일형 | 'all_round' | 'balanced'
type SpecialTagId = 'mutual_benefactor'|'long_lasting'|'spark'|'complementary'|'quiet_sync'
interface Classification { type; tags: SpecialTagId[] }   // tags ≤ 2
interface Interpretation { typeDescription; oneLiner; details: Record<RelationshipAxis, string> }
interface CompatibilityResult { scores; classification; analysis; interpretation | null }

// profile.ts
interface Profile extends BirthInput { id; userId: string | null; nickname; createdAt }
interface VisitorPublicView { nickname }                 // 링크 소유자에게 보이는 전부
interface RankingEntry { resultId; nickname; relationshipType; specialTags; romance; friendship; benefactor /* bToA */; teamwork; growth; total; createdAt }
```

## 3. DB 스키마 (Supabase)

`users`는 Supabase `auth.users`를 그대로 사용한다.

```sql
create table profiles (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references auth.users(id) on delete set null,  -- 게스트(방문자)는 null
  nickname           text not null check (char_length(nickname) between 1 and 12),
  birth_date         date not null,
  birth_time         time,
  birth_time_unknown boolean not null default false,
  calendar_type      text not null check (calendar_type in ('solar','lunar')),
  is_leap_month      boolean not null default false,
  gender             text not null check (gender in ('male','female')),
  claim_token        uuid unique default gen_random_uuid(),   -- 비로그인 입력 → 로그인 후 연결용
  created_at         timestamptz not null default now()
);

create table invite_links (
  id               uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references profiles(id) on delete cascade,
  slug             text not null unique check (slug ~ '^[a-z0-9-]{3,20}$'),
  active           boolean not null default true,
  created_at       timestamptz not null default now()
);

create table compatibility_results (
  id                  uuid primary key default gen_random_uuid(),
  owner_profile_id    uuid not null references profiles(id) on delete cascade,
  visitor_profile_id  uuid not null references profiles(id) on delete cascade,
  visitor_nickname    text not null,          -- 랭킹 조회 시 방문자 profiles 를 열지 않기 위한 비정규화
  romance_score       smallint not null,
  friendship_score    smallint not null,
  benefactor_a_to_b   smallint not null,      -- owner → visitor
  benefactor_b_to_a   smallint not null,      -- visitor → owner
  teamwork_score      smallint not null,
  growth_score        smallint not null,
  total_score         smallint not null,      -- '전체' 탭 정렬용
  relationship_type   text not null,
  special_tags        text[] not null default '{}',
  interpretation      jsonb,                  -- AI 해석 캐시
  created_at          timestamptz not null default now()
);
```

접근 권한 분리:

- **profiles**: RLS로 본인 행만 읽기·수정. 방문자 프로필은 `user_id`가 null이라 클라이언트에서 아무도 읽을 수 없고, 서버 액션이 service role로만 다룬다.
- **invite_links**: active 링크는 slug와 owner_profile_id만 공개. 랜딩에 필요한 소유자 닉네임은 `security definer` 함수 하나로만 반환.
- **compatibility_results**: 소유자는 자기 링크의 결과를 읽되 컬럼에 출생 정보가 없으므로 닉네임·유형·점수만 보게 된다. 결과 페이지는 UUID를 아는 사람이면 열람 가능.
- **claim_token**: 로그인 전 입력한 프로필의 토큰을 httpOnly 쿠키에 두었다가, 로그인 완료 시 그 프로필의 user_id를 채운다.

## 4. 모바일 페이지 구조

390px 기준, 430px 중앙 고정, 아이보리 배경.

- **/ 홈**: "우리는 어떤 인연일까." 큰 타이포, 겹치는 두 원 일러스트, [내 사주 등록하고 링크 만들기], 우상단 [내 페이지] 텍스트 링크.
- **/create**: TopNavigation, 닉네임 → 생년월일 → 양력/음력 → 성별 → 태어난 시간(모름 토글). 하단 고정 버튼. 제출 시 로그인 상태면 바로 링크 생성, 아니면 /login 후 연결.
- **/u/[slug]**: "다연님과 당신은 어떤 인연일까요?" + 일러스트 + [우리 인연 확인하기]. OG 메타 포함.
- **/u/[slug]/join**: /create와 같은 BirthForm 재사용. 제출 후 LoadingAnalysis → /result/[id].
- **/result/[id]**: 헤드라인 → 일러스트 → RelationshipTypeBadge + SpecialTag ≤2 → 유형 설명 → RelationshipScoreBar 5개(상위 2축 로즈 강조, 귀인은 양방향 표기) → 한 줄 결과 → 축별 상세 5단락 → [결과 공유하기] [나도 내 인연 링크 만들기].
- **/me**: 닉네임, 참여 인원, 내 링크 URL(복사) + [링크 공유하기], [인연 랭킹] 진입.
- **/me/ranking**: 헤드라인 + 참여 인원 → RankingTopSummary(축별 1위 5칸 가로 스크롤) → RankingTabs(전체/연애/친구/귀인/협업/성장) → RankingItem 리스트 → 탭하면 /result/[id]. 귀인 탭은 bToA 기준 정렬.

## 5. 사주 엔진 인터페이스 (`src/lib/saju`)

```ts
toSolarDate(input: BirthInput): { date: string }                       // 음력 → 양력 (윤달 포함)
calculateFourPillars(input: BirthInput): FourPillars                    // 진입점
calculateYearPillar(dt: KstDateTime, terms: SolarTermTable): Pillar     // 입춘 절입 시각 기준
calculateMonthPillar(dt: KstDateTime, terms: SolarTermTable): Pillar    // 12절 절입 시각 기준
calculateDayPillar(dt: KstDateTime, opts: SajuOptions): Pillar          // JDN 기반 60갑자
calculateHourPillar(dayStem: Stem, dt: KstDateTime): Pillar             // 시간 모름이면 호출 안 함
calculateElements(p: FourPillars, opts: SajuOptions): ElementBalance
calculateTenGods(p: FourPillars): TenGodMap
buildSajuChart(input: BirthInput): SajuChart                            // 위 전부 조합
getSolarTerms(year: number): SolarTermTable                             // 24절기 KST 시각, 분 단위
```

- 절기 시각은 태양 황경 근사식으로 자체 계산. 입춘·절입 경계 테스트는 한국천문연구원 공표 시각을 기준값 테이블로 두고 검증.
- 일주 경계는 `sajuOptions.dayBoundary`, 기본 자정(00:00). 23시 이후는 子시.
- KST 그대로 사용. 진태양시·출생지 보정 없음.

## 6. 궁합 엔진 인터페이스 (`src/lib/compatibility`)

```ts
calculateStemRelation(a: Stem, b: Stem): StemRelation
//   { kind: 'hap'|'generates'|'controls'|'same'|'none', direction: 'aToB'|'bToA'|'mutual'|null }
calculateBranchRelation(a: Branch, b: Branch): BranchRelation
//   { yukhap, samhap, banghap, chung, hyeong, pa, hae }  각 boolean
calculateElementBalance(a: ElementBalance, b: ElementBalance): ElementComplement
//   { aSuppliesB, bSuppliesA, similarity, aLacking, bLacking }   방향성 있음
calculateTenGodRelation(a: SajuChart, b: SajuChart): { aSeesB: TenGod; bSeesA: TenGod }
calculateCompatibility(a: SajuChart, b: SajuChart): CompatibilityAnalysis
calculateRelationshipScores(x: CompatibilityAnalysis, w = compatibilityWeights): RelationshipScores
classifyRelationshipType(s: RelationshipScores, rules = relationshipTypeRules): Classification
analyze(a: BirthInput, b: BirthInput): Omit<CompatibilityResult, 'interpretation'>   // 파이프라인 진입점
```

가중치 설정 형태 (`config/compatibilityWeights.ts`, 발췌):

```ts
romance:    { base: 50, dayStemHap: 18, dayBranchYukhap: 12, dayBranchSamhap: 8, dayBranchChung: -15,
              tenGodJeongjaeJeonggwan: 10, elementSupply: 0.15, hyeongPaHae: -6 }
benefactor: { base: 45, tenGodJeongin: 14, tenGodJeonggwan: 10, elementSupply: 0.3, stemGenerates: 12 }  // 방향별 계산
growth:     { base: 50, dayBranchChung: 10, tenGodSanggwanPyeongwan: 12, elementDifference: 0.2 }        // 충이 가점
```

분류 규칙 (`config/relationshipTypes.ts`):

```ts
pairThreshold: 85, singleThreshold: 85,
allRound: { minMean: 85, maxStdDev: 6 }, balanced: { minMean: 65, maxStdDev: 5 },
mutualBenefactor: { min: 85 }, maxTags: 2
```

특별 태그 후보: #상호귀인, #오래가는사이, #불꽃같은인연, #서로다른결, #말없이통하는사이. 우선순위 상위 2개만 노출.

## 7. AI 해석 (PHASE 10)

계산된 `RelationshipScores` + `Classification` + `CompatibilityAnalysis` JSON만 OpenAI API에 전달해 `Interpretation` 형태의 한국어 문장을 받는다. 점수·유형은 절대 AI가 정하지 않는다. 키가 없거나 호출이 실패하면 유형·점수 구간별 템플릿 문장으로 대체한다. 결과는 `compatibility_results.interpretation`에 캐시한다.
