import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/StatusSelect.module.scss";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  value: T | null;
  onChange: (v: T) => void;
  options: readonly Option<T>[];
  placeholder?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  /** 드롭다운 z-index */
  menuZIndex?: number;
};

function StatusSelect<T extends string>({
  value,
  onChange,
  options,
  placeholder = "학적 입력",
  width,
  height,
  style,
  menuZIndex = 10000,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // value에 해당하는 라벨 찾기
  const activeLabel =
    (value && options.find((o) => o.value === value)?.label) || placeholder;

  return (
    <div
      className={styles.selectWrap}
      ref={wrapRef}
      style={{ width, height, ...style }}
    >
      <button
        type="button"
        className={`${styles.selectTrigger} ${
          open || value ? styles.selectTriggerActive : ""
        }`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{ width, height }}
      >
        <span className={styles.triggerText}>{activeLabel} ▼</span>
      </button>

      {open && (
        <div
          className={styles.selectMenu}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()} // blur 방지
          style={{ zIndex: menuZIndex, minWidth: width ?? "100%" }} // ← z-index 강제
        >
          <div className={styles.selectMenuWrapper}>
            {options.map((opt) => {
              const checked = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={styles.optRow}
                  role="option"
                  aria-selected={checked}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <span
                    className={`${styles.box} ${checked ? styles.boxOn : ""}`}
                  />
                  <span className={styles.optText}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusSelect;
