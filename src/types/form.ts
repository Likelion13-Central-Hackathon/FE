// 단계
export type Step = "info" | "consider" | "base";

// 폼 데이터
export type FormData = {
  age: string;
  region: string;
  isCollege: boolean | null;
  status: string | null;
  university: string;
  selectedField: string | null;
  supportRanks: Record<string, RankCode>;
  careers: string | null;
  statuses: string | null;
  itemText: string;
  team: string | null;
  capital: number | null;
  levels: Record<string, number>;
};

// 부분 업데이트 함수
export type UpdateForm = (changes: Partial<FormData>) => void;

// RightOrbit 관련
export type OrbitLabelTriple = [string, string, string];

export type OrbitPositions = {
  t1: { top: string; left: string; transform: string };
  t2: { top: string; left: string; transform: string };
  t3: { top: string; left: string; transform: string };
};

export type OrbitPreset = {
  labels: OrbitLabelTriple;
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
