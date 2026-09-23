import type { RelationshipAxis, RelationshipTypeId, SpecialTagId } from "@/types/compatibility";

export const AXIS_LABELS: Record<RelationshipAxis, string> = {
  romance: "연애",
  friendship: "친구",
  benefactor: "귀인",
  teamwork: "협업",
  growth: "성장",
};

export const RELATIONSHIP_TYPE_LABELS: Record<RelationshipTypeId, string> = {
  friend_benefactor: "친구 + 귀인형",
  romance_friend: "연애 + 친구형",
  romance_growth: "연애 + 성장형",
  romance_benefactor: "연애 + 귀인형",
  friend_growth: "친구 + 성장형",
  friend_teamwork: "친구 + 협업형",
  benefactor_growth: "귀인 + 성장형",
  benefactor_teamwork: "귀인 + 협업형",
  teamwork_growth: "협업 + 성장형",
  romance_teamwork: "연애 + 협업형",
  romance: "연애형",
  friend: "친구형",
  benefactor: "귀인형",
  teamwork: "협업형",
  growth: "성장형",
  all_round: "전천후 인연",
  balanced: "균형형",
};

export const SPECIAL_TAG_LABELS: Record<SpecialTagId, string> = {
  mutual_benefactor: "#상호귀인",
  long_lasting: "#오래가는사이",
  spark: "#불꽃같은인연",
  complementary: "#서로다른결",
  quiet_sync: "#말없이통하는사이",
};

/**
 * 유형 분류 임계값. PHASE 6 에서 classifyRelationshipType 이 사용한다.
 * 점수 기준을 코드에 하드코딩하지 않고 여기서만 조정한다.
 */
export const relationshipTypeRules = {
  pairThreshold: 85,
  singleThreshold: 85,
  allRound: { minMean: 85, maxStdDev: 6 },
  balanced: { minMean: 65, maxStdDev: 5 },
  mutualBenefactor: { min: 85 },
  maxTags: 2,
} as const;
