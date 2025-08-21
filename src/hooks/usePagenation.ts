// 페이지네이션 PageNavigation 관련 커스텀훅
import { useCallback, useMemo, useState } from "react";

type UsePaginationOptions = {
  initPage?: number;
  windowSize: number;
};

type usePaginationReturn = {
  page: number; // 페이지
  setPage: React.Dispatch<React.SetStateAction<number>>;
  windowStart: number; // 시작 페이지 번호
  maxKnownPage: number; // 알고있는 최대 페이지
  pageButtons: number[]; // 숫자 버튼들
  canPrev: boolean; // 이전이 있는지
  goPrev: (opts?: { onChange?: (nextPage: number) => void }) => void;
  goNext: (opts: {
    canNext: boolean;
    onChange?: (nextPage: number) => void;
  }) => void;
  goPage: (p: number, opts?: { onChange?: (nextPage: number) => void }) => void;
  ackKnown: (p: number) => void; // 데이터 수신 후 "이 페이지까지는 존재" 확정 시 호출
  reset: () => void;
};

export default function usePagination({
  initPage = 0,
  windowSize,
}: UsePaginationOptions): usePaginationReturn {
  const [page, setPage] = useState(initPage);
  const [windowStart, setWindowStart] = useState(0);
  const [maxKnownPage, setMaxKnownPage] = useState(initPage);

  const canPrev = page > 0;

  const pageButtons = useMemo(() => {
    const end = Math.min(windowStart + windowSize - 1, maxKnownPage);
    const arr: number[] = [];
    for (let i = windowStart; i <= end; i++) arr.push(i);
    return arr;
  }, [windowStart, windowSize, maxKnownPage]);

  const ackKnown = useCallback((p: number) => {
    setMaxKnownPage((prev) => Math.max(prev, p));
  }, []);

  // 이전 이동
  const goPrev = useCallback(
    ({ onChange }: { onChange?: (next: number) => void } = {}) => {
      if (!canPrev) return;
      setPage((prev) => {
        const next = Math.max(0, prev - 1);
        setWindowStart((ws) => (next < ws ? Math.max(0, ws - 1) : ws));
        onChange?.(next);
        return next;
      });
    },
    [canPrev]
  );

  // 다음 이동
  const goNext = useCallback(
    ({
      canNext,
      onChange,
    }: {
      canNext: boolean;
      onChange?: (next: number) => void;
    }) => {
      if (!canNext) return;
      setPage((prev) => {
        const next = prev + 1;
        setWindowStart((ws) => {
          const winEnd = ws + windowSize - 1;
          return next > winEnd ? ws + 1 : ws;
        });
        onChange?.(next);
        return next;
      });
    },
    [windowSize]
  );

  // 숫자 클릭하면 이동
  const goPage = useCallback(
    (p: number, { onChange }: { onChange?: (next: number) => void } = {}) => {
      setWindowStart((ws) => {
        const winEnd = ws + windowSize - 1;
        if (p < ws) return p;
        if (p > winEnd) return p - (windowSize - 1);
        return ws;
      });
      setPage((curr) => {
        if (p === curr) return curr;
        onChange?.(p);
        return p;
      });
    },
    [windowSize]
  );

  // 페이지 초기화
  const reset = useCallback(() => {
    setPage(0);
    setWindowStart(0);
    setMaxKnownPage(0);
  }, []);

  return {
    page,
    setPage,
    windowStart,
    maxKnownPage,
    pageButtons,
    canPrev,
    goPrev,
    goNext,
    goPage,
    ackKnown,
    reset,
  };
}
