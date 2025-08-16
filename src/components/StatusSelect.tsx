import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/StatusSelect.module.scss";

type Props = {
  value: string | null;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  /** 드롭다운 z-index(필요하면 조절) */
  menuZIndex?: number;
};

const StatusSelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  placeholder = "학적 입력",
  width,
  height,
  style,
  menuZIndex = 10000, // ← 메뉴를 충분히 위로 올림
}) => {
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

  const label = value ?? placeholder;

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
        {label}
        <span className={styles.caret}>▼</span>
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
              const checked = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  className={styles.optRow}
                  role="option"
                  aria-selected={checked}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  <span
                    className={`${styles.box} ${checked ? styles.boxOn : ""}`}
                  />
                  <span className={styles.optText}>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSelect;
