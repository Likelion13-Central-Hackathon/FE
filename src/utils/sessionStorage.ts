// 세션스토리지에 id 저장, 조회, 삭제
export type IdSession = {
  save: (id: number) => void;
  read: () => number | null;
  clear: () => void;
};

export const makeIdSession = (key: string): IdSession => ({
  save(id: number) {
    sessionStorage.setItem(key, String(id));
  },
  read(): number | null {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  },
  clear() {
    sessionStorage.removeItem(key);
  },
});

export const ideaSession = makeIdSession("idea:current"); // ideaId
export const reportSession = makeIdSession("report:current"); // reportId
// answerId
const _cache = new Map<number, IdSession>();
export const aiAnswerSession$ = (qnum: number): IdSession => {
  if (!_cache.has(qnum)) {
    _cache.set(qnum, makeIdSession(`aiAnswer:current${qnum}`));
  }
  return _cache.get(qnum)!;
};