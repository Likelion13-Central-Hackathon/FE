// 단계
export type Step = "info" | "consider" | "base";

// 학적 상태
export type AcademicStatus =
  | "ENROLLED"
  | "LEAVE_OF_ABSENCE"
  | "TRANSFER"
  | "READMISSION";

export const ACADEMIC_STATUS_OPTIONS: {
  value: AcademicStatus;
  label: string;
}[] = [
  { value: "ENROLLED", label: "재학" },
  { value: "LEAVE_OF_ABSENCE", label: "휴학" },
  { value: "TRANSFER", label: "편입" },
  { value: "READMISSION", label: "재입학" },
];

// 폼 데이터
export type FormData = {
  age: string;
  addressCity: string;
  addressDistrict: string;
  isEnrolled: boolean | null;
  university: string | null;
  academicStatus: AcademicStatus | null;
  selectedField: string | null;
  supportRanks: Record<string, RankCode>;
  careers: string | null;
  statuses: string | null;
  itemText: string;
  team: string | null;
  capital: string | null;
  levels: Record<string, string>;
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

export const RANK_LABELS: RankLabel[] = ["상", "중", "하", "없음"];

// 사업 종류
export type FieldOpt = {
  id: string;
  group: string;
  title: string;
  subtitle?: string;
  order: number;
};
