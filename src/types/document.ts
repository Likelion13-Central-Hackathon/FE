/* ===== 공통 타입 ===== */

// 단일 Q&A 아이템 (QuestionsBox, ItemSnapshot 등에서 사용)
export type QAItem = { question: string; answer: string };

// 첨삭 제목/설명 (RevisingBox props, DocumentItemProps 기본값)
export type RevisingTitle = {
  title: string;
  explanation: string;
};

/* ===== 컴포넌트 Props ===== */

// QuestionsBox props (questions 배열 전달)
export type QuestionsBoxProps = {
  questions: QAItem[];
};

/* ===== 컴포넌트 Handles ===== */

// RevisingBox 핸들 (사용자/AI 답변 getter)
export type RevisingBoxHandle = {
  getUserAnswer: () => string;
  getAiAnswer: () => string;
  getAnswerId: () => number | null;
};

// QuestionsBox 핸들 (현재 노출되는 QA getter)
export type QuestionsBoxHandle = {
  getVisibleQA: () => QAItem[];
};

/* ===== DocumentItem 전용 ===== */

// DocumentItem 스냅샷 구조 (title, 답변, QA 포함)
export type ItemSnapshot = {
  title: string;
  userAnswer: string;
  aiAnswer: string;
  qa: QAItem[];
};

// DocumentItem 핸들 (getSnapshot 제공)
export type ItemHandle = {
  getSnapshot: () => ItemSnapshot;
};

// DocumentItem props (RevisingTitle + PDF 내보내기 콜백)
export type DocumentItemProps = RevisingTitle & {
  onExportAll?: () => void;
  onRequireWarn?: () => void
};

export type ExtraProps = {
  getAiAnswer?: () => string;
  getAnswerId?: () => number | null;
  onRequireWarn?: () => void;
};

export type CreateAiAnswerRequest = {
  questionNumber: number;
  userAnswer: string;
};

export type CreateAiAnswerResult = {
  aiAnswer: string;
  answerId: number;
};