import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/FormPage.module.scss";
import background from "../assets/images/formpage-background.svg";
import logo from "../assets/images/main-logo.svg";
import BasicButton from "../components/BasicButton";

const STATUS_OPTIONS = ["휴학", "재학", "편입", "재입학"];

const FormPage: React.FC = () => {
  const [isCollege, setIsCollege] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string | null>(null); // 단일 선택

  return (
    <div className={styles.container}>
      <img className={styles.background} src={background} alt="background" />

      <div className={styles.formBox}>
        <img className={styles.logo} src={logo} alt="logo" />

        <div className={styles.questionbox}>
          {/* Q1 */}
          <div className={styles.q}>
            <label className={styles.label}>
              몇 살이에요? 어디에서 사업을 하고 계신지도 알려주세요.
            </label>
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.subLabel}>나이</div>
                <input className={styles.age} type="text" placeholder="Ex. 만 25세" />
              </div>
              <div className={styles.col}>
                <div className={styles.subLabel}>사업장 주소</div>
                <button className={styles.regionBtn}>지역 선택하기</button>
              </div>
            </div>
          </div>

          {/* Q2 */}
          <div className={styles.q}>
            <label className={styles.label}>현재 대학교에 다니고 있나요?</label>
            <div className={styles.btnGroup}>
              <BasicButton
                text="예"
                onClick={() => setIsCollege(true)}
                width="7.03125vw"
                height="2.1875vw"
                // @ts-ignore
                active={isCollege === true}
              />
              <BasicButton
                text="아니오"
                onClick={() => setIsCollege(false)}
                width="7.03125vw"
                height="2.1875vw"
                // @ts-ignore
                active={isCollege === false}
              />
            </div>
          </div>

          {/* Q3 (예일 때만 노출) */}
          <div className={styles.q}>
            <label className={styles.label}>
              어느 대학교에 다니고 계신가요? 학적상태도 알려주세요.
            </label>
            <div className={styles.caption}>예를 선택했을 시에만 표기</div>

            {isCollege === true && (
              <div className={styles.row}>
                <input className={styles.unv} type="text" placeholder="학교입력" />
                <StatusSelect value={status} onChange={setStatus} />
              </div>
            )}
          </div>
        </div>

        {/* 하단 중앙 버튼 */}
        <div className={styles.nextBtnWrapper}>
          <BasicButton text="다음" onClick={() => console.log("다음")} width="5.260417vw" height="1.92vw" />
        </div>
      </div>
    </div>
  );
};

export default FormPage;

/* ===== 단일 선택 드롭다운 (트리거 텍스트 고정 + 바로 아래 위치) ===== */
function StatusSelect({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // 트리거 라벨은 항상 고정
  const label = "학적 입력";
  // 값이 있거나 열려 있으면 파란 버튼
  const triggerClass = `${styles.selectTrigger} ${
    open || value ? styles.selectTriggerActive : ""
  }`;

  return (
    <div className={styles.selectWrap} ref={wrapRef}>
      <button
        type="button"
        className={triggerClass}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {label}
        <span className={styles.caret}>▼</span>
      </button>

      {open && (
        <div
          className={styles.selectMenu}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()} // 클릭 시 포커스 이동 방지
        >
          {STATUS_OPTIONS.map((opt) => {
            const checked = value === opt;
            return (
              <button
                type="button"
                key={opt}
                className={styles.optRow}
                role="option"
                aria-selected={checked}
                onClick={() => {
                  onChange(opt);  // 값 저장
                  setOpen(false); // 닫기
                }}
              >
                {/* 왼쪽 사각 체크박스(윤곽선은 SCSS에서만 표시) */}
                <span className={`${styles.box} ${checked ? styles.boxOn : ""}`} />
                <span className={styles.optText}>{opt}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


