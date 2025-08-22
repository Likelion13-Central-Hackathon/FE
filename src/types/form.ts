// 단계
export type Step = "info" | "consider" | "base";

// 학적 상태
export type AcademicStatus =
  | "ENROLLED"
  | "LEAVE_OF_ABSENCE"
  | "TRANSFER"
  | "READMISSION";

// 폼 데이터
export type FormData = {
  age: string;
  addressCity: string;
  addressDistrict: string;
  isEnrolled: boolean | null;
  university: string | null;
  academicStatus: AcademicStatus | null;
  interestArea: string;
  supportNeeds: Partial<Record<SupportKey, RankCode>>;
  businessAge: BusinessAge | null;
  stage: StartupStage | null;
  title: string;
  description: string;
  teamSize: TeamSize | null;
  capital: CapitalScale | null;
  resources: Partial<Record<ResourceKey, RankCode>>;
};

// 부분 업데이트 함수
export type UpdateForm = (changes: Partial<FormData>) => void;

// RightOrbit 관련
// 공통 좌표 타입
export type OrbitPointPos = { top: string; left: string; transform: string };

// 라벨: 3개 또는 5개
export type OrbitLabels =
  | [string, string, string]
  | [string, string, string, string, string];

// 좌표
export type OrbitPositions = {
  t1: OrbitPointPos;
  t2: OrbitPointPos;
  t3: OrbitPointPos;
} & {
  t4?: OrbitPointPos;
  t5?: OrbitPointPos;
};

// 프리셋
export type OrbitPreset = {
  labels: OrbitLabels;
  positions: OrbitPositions;
};

// 단계 컴포넌트 공통 props
export type StepComponentProps = {
  data: FormData;
  updateForm: UpdateForm;
  onPrev?: () => void;
  onNext?: () => void;
};

// ----- ConsiderForm
export type RankLabel = "상" | "중" | "하" | "없음";
export type RankCode = "HIGH" | "MEDIUM" | "LOW" | "NONE";

// 업력
export type BusinessAge =
  | "PRE_STARTUP"
  | "EARLY_STAGE"
  | "GROWTH_STAGE"
  | "NEW_INDUSTRY";

// 현황
export type StartupStage =
  | "EXPLORATION"
  | "PLANNING_VALIDATION"
  | "PREPARATION"
  | "IDEA"
  | "EXECUTION"
  | "GROWTH";

// 사업 종류
export type FieldOpt = {
  id: string;
  group: string;
  title: string;
  subtitle?: string;
  order: number;
};

export type SupportKey =
  | "COMMERCIALIZATION"
  | "RND"
  | "FACILITY_INCUBATION"
  | "MENTORING_CONSULTING"
  | "EVENT_NETWORK"
  | "LOAN"
  | "TALENT"
  | "GLOBAL";

// --- BaseResource
// 팀 규모
export type TeamSize =
  | "SIZE_1_2"
  | "SIZE_3_5"
  | "SIZE_6_10"
  | "SIZE_11_20"
  | "RECRUITING";

// 자본 규모
export type CapitalScale =
  | "UNDER_1M"
  | "UNDER_3M"
  | "UNDER_5M"
  | "UNDER_10M"
  | "OVER_10M"
  | "NONE";

// 자원
export type ResourceKey =
  | "TECH_CAPABILITY"
  | "DESIGN_CAPABILITY"
  | "MARKETING_CHANNEL"
  | "HUMAN_NETWORK"
  | "SPACE_EQUIPMENT"
  | "KNOWLEDGE_EXPERIENCE";
