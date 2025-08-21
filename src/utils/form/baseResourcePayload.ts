import type {
  FormData,
  RankCode,
  TeamSize,
  CapitalScale,
  ResourceKey,
} from "../../types/form";

export type BaseResourcePayload = {
  teamSize: TeamSize;
  capital: CapitalScale;
  resources: Record<ResourceKey, RankCode>;
};

export function baseResourcePayload(data: FormData): BaseResourcePayload {
  if (!data.teamSize) throw new Error("팀원 수를 선택해주세요.");
  if (!data.capital) throw new Error("자본 규모를 선택해주세요.");

  // 누락 키는 NONE으로 보정
  const defaultResources: Record<ResourceKey, RankCode> = {
    TECH_CAPABILITY: "NONE",
    DESIGN_CAPABILITY: "NONE",
    MARKETING_CHANNEL: "NONE",
    HUMAN_NETWORK: "NONE",
    SPACE_EQUIPMENT: "NONE",
    KNOWLEDGE_EXPERIENCE: "NONE",
  };

  const merged = { ...defaultResources, ...(data.resources ?? {}) };

  return {
    teamSize: data.teamSize,
    capital: data.capital,
    resources: merged,
  };
}
