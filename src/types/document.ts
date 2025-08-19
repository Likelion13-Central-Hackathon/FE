/* ===== 공통 타입 ===== */
export type QAItem = { question: string; answer: string };

export type RevisingTitle = {
  title: string;
  explanation: string;
};

/* ===== 컴포넌트 Props ===== */
export type QuestionsBoxProps = {
  questions: QAItem[];
};

/* ===== 컴포넌트 Handles(외부에서 참조) ===== */
export type RevisingBoxHandle = {
  getUserAnswer: () => string;
  getAiAnswer: () => string;
};

export type QuestionsBoxHandle = {
  getVisibleQA: () => QAItem[];
};

/* ===== DocumentItem 전용 ===== */
export type ItemSnapshot = {
  title: string;
  userAnswer: string;
  aiAnswer: string;
  qa: QAItem[];
};

export type ItemHandle = {
  getSnapshot: () => ItemSnapshot;
};

export type DocumentItemProps = RevisingTitle & {
  onExportAll?: () => void;
};
