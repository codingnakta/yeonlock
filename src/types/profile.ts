import type { BirthInput } from "./saju";
import type { RelationshipTypeId, SpecialTagId } from "./compatibility";

export interface Profile extends BirthInput {
  id: string;
  /** 비로그인 방문자는 null */
  userId: string | null;
  nickname: string;
  createdAt: string;
}

export interface InviteLink {
  id: string;
  ownerProfileId: string;
  slug: string;
  active: boolean;
  createdAt: string;
}

/** 링크 소유자에게 보이는 방문자 정보의 전부 */
export interface VisitorPublicView {
  nickname: string;
}

/** 랭킹 목록 한 줄 */
export interface RankingEntry {
  resultId: string;
  nickname: string;
  relationshipType: RelationshipTypeId;
  specialTags: SpecialTagId[];
  romance: number;
  friendship: number;
  /** 상대가 나에게 귀인인 정도 (visitor → owner) */
  benefactor: number;
  teamwork: number;
  growth: number;
  total: number;
  createdAt: string;
}
