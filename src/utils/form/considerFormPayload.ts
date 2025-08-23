import type {
  FormData,
  RankCode,
  BusinessAge,
  StartupStage,
  SupportKey,
} from "../../types/form";
import { SUPPORT_ITEMS } from "../../data/formData";

// 이 파일이 반환하는 페이로드 타입
export type ConsiderPayload = {
  interestArea: string;
  supportNeeds: Record<SupportKey, RankCode>;
  businessAge: BusinessAge;
  stage: StartupStage;
  title: string;
  description: string;
};

/**
 * ConsiderForm에서 입력한 값을 백엔드 RequestBody 형태로 변환
 * - interestArea: 문자열 (subtitle || title)
 * - supportNeeds: SUPPORT_ITEMS의 .value를 키로, RankCode(HIGH/MEDIUM/LOW/NONE) 값 보장
 * - businessAge: enum 그대로
 * - stage: enum 그대로
 * - description: trim 후 사용
 */
export function considerFormPayload(data: FormData): ConsiderPayload {
  // 분야
  const interestArea = (data.interestArea || "").trim();
  if (!interestArea) {
    throw new Error("분야를 선택해주세요.");
  }

  // 업력
  if (!data.businessAge) {
    throw new Error("창업 업력을 선택해주세요.");
  }

  // 창업 현황
  if (!data.stage) {
    throw new Error("현재 창업 현황을 선택해주세요.");
  }

  // 아이템
  const description = (data.description || "").trim();
  if (!description) {
    throw new Error("창업 아이템 설명을 입력해주세요.");
  }

  const title = (data.title || "").trim();
  if (!title) {
    throw new Error("창업 아이템 제목을 입력해주세요.");
  }

  // 지원 순위
  const supportNeeds = SUPPORT_ITEMS.reduce<Record<SupportKey, RankCode>>(
    (acc, it) => {
      acc[it.key] = data.supportNeeds?.[it.key] ?? "NONE";
      return acc;
    },
    {} as Record<SupportKey, RankCode>
  );

  return {
    interestArea,
    supportNeeds,
    businessAge: data.businessAge,
    stage: data.stage,
    title,
    description,
  };
}
