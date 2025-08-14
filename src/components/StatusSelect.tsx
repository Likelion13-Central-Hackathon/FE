import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/StatusSelect.module.scss";

type Props = {
  value: string | null;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  /** 이 컴포넌트를 쓰는 파일에서만 개별 크기 제어 */
  width?: string;   // 예: "7.92vw" / "160px" / "100%"
  height?: string;  // 예: "2.19vw" / "40px"
  style?: React.CSSProperties; // (선택) 더 세밀한 오버라이드
};

const StatusSelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  placeholder = "학적 입력",
  width,
  height,
  style,
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
      // ✅ 이 컴포넌트를 쓰는 파일에서만 크기 오버라이드
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
        // 버튼 높이도 맞춰줌 (width는 부모가 먹음)
        style={{ width, height }}
      >
        {label}
        <span className={styles.caret}>▼</span>
      </button>

      {open && (
        <div
          className={styles.selectMenu}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
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
