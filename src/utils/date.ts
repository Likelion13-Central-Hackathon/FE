// ReportPlan에서 시작 월 index 추출
export const startMonthIndex = (createdAt: string): number | null => {
  const m = createdAt.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
  if (!m) return null;
  const month = Number(m[2]);
  if (month < 1 || month > 12) return null;

  return month - 1;
};

// 해당 인덱스로 시작하는 배열 만들기
export const rotateArray = <T>(arr: T[], startIdx: number): T[] => {
  const n = arr.length;
  const s = ((startIdx % n) + n) % n;
  return [...arr.slice(s), ...arr.slice(0, s)];
};
