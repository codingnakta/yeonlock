/** 천간 */
export type Stem = "甲" | "乙" | "丙" | "丁" | "戊" | "己" | "庚" | "辛" | "壬" | "癸";
/** 지지 */
export type Branch = "子" | "丑" | "寅" | "卯" | "辰" | "巳" | "午" | "未" | "申" | "酉" | "戌" | "亥";
/** 오행 */
export type Element = "wood" | "fire" | "earth" | "metal" | "water";
export type YinYang = "yang" | "yin";
/** 십신 */
export type TenGod =
  | "比肩" | "劫財" | "食神" | "傷官" | "偏財"
  | "正財" | "偏官" | "正官" | "偏印" | "正印";

export type CalendarType = "solar" | "lunar";
export type Gender = "male" | "female";

export interface Pillar {
  stem: Stem;
  branch: Branch;
}

export interface FourPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  /** 태어난 시간을 모르면 null */
  hour: Pillar | null;
}

/** 사용자가 입력하는 출생 정보 (KST 기준) */
export interface BirthInput {
  /** 'YYYY-MM-DD' */
  birthDate: string;
  /** 'HH:mm', 모르면 null */
  birthTime: string | null;
  birthTimeUnknown: boolean;
  calendarType: CalendarType;
  /** 음력 윤달 여부 */
  isLeapMonth: boolean;
  gender: Gender;
}

export type ElementBalance = Record<Element, number>;

export interface TenGodMap {
  year: TenGod;
  month: TenGod;
  hour: TenGod | null;
}

/** 사주 엔진의 최종 산출물. 궁합 엔진의 입력이 된다. */
export interface SajuChart {
  pillars: FourPillars;
  dayMaster: Stem;
  dayMasterElement: Element;
  elements: ElementBalance;
  tenGods: TenGodMap;
  hasHour: boolean;
}
