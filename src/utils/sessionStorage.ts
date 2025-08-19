// --- ideaId
const KEY = "idea:current";

// ideaId -> 문자열 변환 -> sessionStorage에 저장
export function saveIdeaIdToSession(ideaId: number) {
  sessionStorage.setItem(KEY, String(ideaId));
}

// ideaId 조회 -> 숫자 변환 (없으면 null)
export function readIdeaIdFromSession(): number | null {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

// sesscionStorage에서 ideaId 삭제
export function clearIdeaIdFromSession() {
  sessionStorage.removeItem(KEY);
}
