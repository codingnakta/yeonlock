import type { Branch, Element, Stem, TenGod } from "./saju";

export type RelationshipAxis = "romance" | "friendship" | "benefactor" | "teamwork" | "growth";

export const RELATIONSHIP_AXES: RelationshipAxis[] = [
  "romance", "friendship", "benefactor", "teamwork", "growth",
];

export interface BenefactorScore {
  /** owner(A) → visitor(B) */
  aToB: number;
  /** visitor(B) → owner(A) */
  bToA: number;
  total: number;
}

export interface RelationshipScores {
  romance: number;
  friendship: number;
  benefactor: BenefactorScore;
  teamwork: number;
  growth: number;
}

export type StemRelationKind = "hap" | "generates" | "controls" | "same" | "none";
export interface StemRelation {
  a: Stem;
  b: Stem;
  kind: StemRelationKind;
  /** generates / controls 의 방향 */
  direction: "aToB" | "bToA" | "mutual" | null;
}

export interface BranchRelation {
  a: Branch;
  b: Branch;
  yukhap: boolean;
  samhap: boolean;
  banghap: boolean;
  chung: boolean;
  hyeong: boolean;
  pa: boolean;
  hae: boolean;
}

export interface ElementComplement {
  /** A 의 오행이 B 의 부족한 오행을 채워주는 정도 (0~1) */
  aSuppliesB: number;
  bSuppliesA: number;
  /** 두 사람 오행 분포의 유사도 (0~1) */
  similarity: number;
  aLacking: Element[];
  bLacking: Element[];
}

/** 궁합 엔진 중간 산출물. 점수의 근거가 된다. */
export interface CompatibilityAnalysis {
  dayStem: StemRelation;
  dayBranch: BranchRelation;
  crossBranches: BranchRelation[];
  elements: ElementComplement;
  tenGods: {
    /** A 일간 기준으로 본 B 일간 */
    aSeesB: TenGod;
    bSeesA: TenGod;
  };
}

export type RelationshipTypeId =
  | "friend_benefactor"
  | "romance_friend"
  | "romance_growth"
  | "romance_benefactor"
  | "friend_growth"
  | "friend_teamwork"
  | "benefactor_growth"
  | "benefactor_teamwork"
  | "teamwork_growth"
  | "romance_teamwork"
  | "romance"
  | "friend"
  | "benefactor"
  | "teamwork"
  | "growth"
  | "all_round"
  | "balanced";

export type SpecialTagId =
  | "mutual_benefactor"
  | "long_lasting"
  | "spark"
  | "complementary"
  | "quiet_sync";

export interface Classification {
  type: RelationshipTypeId;
  /** 최대 2개 */
  tags: SpecialTagId[];
}

export interface Interpretation {
  /** 대표 유형 아래 두 줄 설명 */
  typeDescription: string;
  /** 한 줄 결과 */
  oneLiner: string;
  details: Record<RelationshipAxis, string>;
}

export interface CompatibilityResult {
  scores: RelationshipScores;
  classification: Classification;
  analysis: CompatibilityAnalysis;
  interpretation: Interpretation | null;
}
