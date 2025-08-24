/* ===== 공통 타입 ===== */

// 단일 Q&A 아이템
export type QAItem = { question: string; answer: string };

// 첨삭 제목/설명
export type RevisingTitle = {
  title: string;
  explanation: string;
};

/* ===== Zustand용 상태 ===== */

export type ItemState = {
  id: number; // questionNumber
  title: string;
  userAnswer: string;
  aiAnswer: string;
  qa: QAItem[];
};

/* ===== 컴포넌트 Props ===== */

// DocumentItem
export type DocumentItemProps = RevisingTitle & {
  questionNumber: number;
  onExportAll?: () => void;
  onRequireWarn?: () => void;
};

// QuestionsBox
export type QuestionsBoxProps = {
  questionNumber: number;
  onRequireWarn?: () => void;
};

/* ===== API 타입 ===== */

export type CreateAiAnswerRequest = {
  questionNumber: number;
  userAnswer: string;
};

export type CreateAiAnswerResult = {
  aiAnswer: string;
  answerId: number;
};
