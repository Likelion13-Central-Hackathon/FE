import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ConsiderForm.module.scss";
import { FieldOpt } from "../../../types/form";

/* ===== 분야 드롭다운 ===== */
export default function FieldSelect({
  value,
  onChange,
  placeholder = "분야 선택하기",
  options,
}: {
  value: string | null;
  onChange: (id: string) => void;
  placeholder?: string;
  options: readonly FieldOpt[];
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return options.filter((o) =>
      `${o.group} ${o.title} ${o.subtitle ?? ""}`.toLowerCase().includes(qq)
    );
  }, [options, q]);

  const grouped = useMemo(() => {
    const m = new Map<string, FieldOpt[]>();
    for (const it of filtered) {
      if (!m.has(it.group)) m.set(it.group, []);
      m.get(it.group)!.push(it);
    }
    return Array.from(m.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const selected = options.find((o) => o.id === value) || null;
  const triggerLabel = selected
    ? `${selected.group} / ${selected.order}`
    : placeholder;

  const flatList = useMemo(
    () =>
      grouped.reduce<FieldOpt[]>((acc, [, arr]) => (acc.push(...arr), acc), []),
    [grouped]
  );
  useEffect(() => setActiveIndex(0), [q, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = flatList[activeIndex];
      if (target) {
        onChange(target.id);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.querySelector<HTMLElement>(
      `[data-idx="${activeIndex}"]`
    );
    if (item) {
      const parent = listRef.current;
      const itTop = item.offsetTop;
      const itBottom = itTop + item.offsetHeight;
      if (itTop < parent.scrollTop) parent.scrollTop = itTop - 8;
      else if (itBottom > parent.scrollTop + parent.clientHeight)
        parent.scrollTop = itBottom - parent.clientHeight + 8;
    }
  }, [activeIndex]);

  return (
    <div className={styles.fieldWrap} ref={wrapRef} onKeyDown={onKeyDown}>
      <button
        type="button"
        className={`${styles.fieldTrigger} ${
          selected ? styles.fieldTriggerActive : ""
        }`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.fieldTriggerLabel}>{triggerLabel}</span>
      </button>

      {open && (
        <div
          className={styles.fieldMenu}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className={styles.fieldHeader}>
            <div className={styles.fieldHeaderTitle}>분류</div>
            <div className={styles.fieldSearch}>
              <input
                ref={inputRef}
                className={styles.searchInput}
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="검색 Ex. 농업"
              />
              <span className={styles.searchIcon} aria-hidden>
                🔍
              </span>
            </div>
          </div>

          <div className={styles.fieldList} ref={listRef}>
            {grouped.map(([group, arr], gi) => (
              <div key={group}>
                {gi > 0 && <div className={styles.fieldDivider} />}

                {arr.map((item, idxInGroup) => {
                  const idx =
                    grouped
                      .slice(0, gi)
                      .reduce((acc, [, a]) => acc + a.length, 0) + idxInGroup;
                  const active = item.id === value;
                  const focused = idx === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-idx={idx}
                      className={`${styles.fieldOption} ${
                        active ? styles.fieldOptionActive : ""
                      } ${focused ? styles.fieldOptionFocus : ""}`}
                      onClick={() => {
                        onChange(item.id);
                        setOpen(false);
                      }}
                    >
                      <div className={styles.fieldMain}>
                        <div className={styles.fieldGroup}>{item.group}</div>
                        <div className={styles.fieldTexts}>
                          <div className={styles.fieldTitle}>{item.title}</div>
                          {item.subtitle && (
                            <div className={styles.fieldSub}>
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.fieldRight}>{item.order}</div>
                    </button>
                  );
                })}
              </div>
            ))}
            {flatList.length === 0 && (
              <div className={styles.fieldEmpty}>검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
