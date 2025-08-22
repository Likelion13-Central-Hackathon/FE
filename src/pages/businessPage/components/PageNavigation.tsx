import React, { memo } from "react";
import s from "./Business.module.scss";

type PageButton = number | { index: number; disabled?: boolean };

interface PageNavigationProps {
  page: number;
  pageButtons: PageButton[];
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPage: (p: number) => void;
}

const PageNavigation: React.FC<PageNavigationProps> = memo(
  ({ page, pageButtons, canPrev, canNext, onPrev, onNext, onPage }) => {
    const normalized = pageButtons.map((p) =>
      typeof p === "number" ? { index: p, disabled: false } : p
    );

    return (
      <div aria-label="Pagination" className={s.pagination}>
        <button
          type="button"
          disabled={!canPrev}
          onClick={onPrev}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {normalized.map(({ index, disabled }) => (
          <button
            type="button"
            key={index}
            disabled={!!disabled}
            onClick={() => !disabled && onPage(index)}
            aria-current={index === page ? "page" : undefined}
            aria-label={`Go to page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          type="button"
          disabled={!canNext}
          onClick={onNext}
          aria-label="Next page"
        >
          &gt;
        </button>
      </div>
    );
  }
);

export default PageNavigation;
