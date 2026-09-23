/**
 * PHASE 1 전용 목업 데이터.
 * PHASE 7~9 에서 Supabase 조회로 대체하고 이 파일은 삭제한다.
 */
import type { RankingEntry } from "@/types/profile";
import type { CompatibilityResult } from "@/types/compatibility";

export const MOCK_OWNER = { nickname: "다연", slug: "dayeon" };

export const MOCK_RESULT: { id: string; ownerNickname: string; visitorNickname: string } & CompatibilityResult = {
  id: "mock-1",
  ownerNickname: "다연",
  visitorNickname: "지훈",
  scores: {
    romance: 68,
    friendship: 92,
    benefactor: { aToB: 84, bToA: 93, total: 89 },
    teamwork: 76,
    growth: 84,
  },
  classification: { type: "friend_benefactor", tags: ["mutual_benefactor", "long_lasting"] },
  analysis: {
    dayStem: { a: "丙", b: "辛", kind: "hap", direction: "mutual" },
    dayBranch: { a: "午", b: "未", yukhap: true, samhap: false, banghap: false, chung: false, hyeong: false, pa: false, hae: false },
    crossBranches: [],
    elements: { aSuppliesB: 0.6, bSuppliesA: 0.7, similarity: 0.4, aLacking: ["water"], bLacking: ["wood"] },
    tenGods: { aSeesB: "正財", bSeesA: "正官" },
  },
  interpretation: {
    typeDescription: "서로에게 좋은 자극이 되고,\n함께 있을 때 더 나은 사람이 되는 관계예요.",
    oneLiner: "같이 있으면 생각이 커지는 사이.",
    details: {
      romance: "설레는 감정도 있지만 서로의 속도가 달라 가끔 답답함을 느낄 수 있어요.",
      friendship: "대화가 잘 통하고 함께 있으면 시간이 빠르게 가는 편안한 사이예요.",
      benefactor: "서로에게 새로운 선택과 기회를 만들어주는 관계예요.",
      teamwork: "각자의 강점이 달라 역할을 나누면 좋은 결과가 나올 가능성이 커요.",
      growth: "가끔 부딪히지만 그 과정에서 서로가 많이 배우는 관계예요.",
    },
  },
};

export const MOCK_RANKING: RankingEntry[] = [
  { resultId: "mock-1", nickname: "민수", relationshipType: "all_round", specialTags: [], romance: 90, friendship: 94, benefactor: 92, teamwork: 95, growth: 94, total: 93, createdAt: "2026-09-20" },
  { resultId: "mock-2", nickname: "수빈", relationshipType: "friend_benefactor", specialTags: ["mutual_benefactor"], romance: 70, friendship: 97, benefactor: 91, teamwork: 90, growth: 79, total: 91, createdAt: "2026-09-19" },
  { resultId: "mock-3", nickname: "지훈", relationshipType: "romance_growth", specialTags: ["spark"], romance: 95, friendship: 84, benefactor: 80, teamwork: 82, growth: 92, total: 89, createdAt: "2026-09-18" },
  { resultId: "mock-4", nickname: "현우", relationshipType: "benefactor_teamwork", specialTags: [], romance: 62, friendship: 78, benefactor: 94, teamwork: 88, growth: 81, total: 86, createdAt: "2026-09-17" },
  { resultId: "mock-5", nickname: "서연", relationshipType: "friend", specialTags: ["long_lasting"], romance: 66, friendship: 90, benefactor: 74, teamwork: 77, growth: 70, total: 82, createdAt: "2026-09-16" },
  { resultId: "mock-6", nickname: "예린", relationshipType: "balanced", specialTags: [], romance: 74, friendship: 76, benefactor: 72, teamwork: 75, growth: 73, total: 74, createdAt: "2026-09-15" },
];
