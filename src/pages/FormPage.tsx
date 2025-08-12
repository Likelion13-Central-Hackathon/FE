import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/FormPage.module.scss";
import background from "../assets/images/formpage-background.svg";
import logo from "../assets/images/main-logo.svg";
import BasicButton from "../components/BasicButton";

const STATUS_OPTIONS = ["휴학", "재학", "편입", "재입학"];
const REGION_OPTIONS = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

const FormPage: React.FC = () => {
  const [isCollege, setIsCollege] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);

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
                <RegionSelect
                  value={region}
                  onChange={setRegion}
                  placeholder="지역 선택하기"
                  options={REGION_OPTIONS}
                />
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
                {/* ✅ options를 넘겨줌 */}
                <StatusSelect value={status} onChange={setStatus} options={STATUS_OPTIONS} />
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
  options,                // ✅ 옵션을 받도록 수정
}: {
  value: string | null;
  onChange: (v: string) => void;
  options: string[];      // ✅ 타입 추가
}) {
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

  const label = "학적 입력";
  const triggerClass = `${styles.selectTrigger} ${open || value ? styles.selectTriggerActive : ""}`;

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
          className={styles.regionMenu}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
        >
          {/* 헤더 */}
          <div className={styles.selectext}>시/도</div>
          <div className={styles.subtext}>다중선택 가능</div>

          {/* 옵션들 */}
          {options.map((opt) => {
            const checked = value === opt;
            return (
              <button
                key={opt}
                type="button"
                className={styles.regionOption}
                role="option"
                aria-selected={checked}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                <span className={`${styles.box} ${checked ? styles.boxOn : ""}`} />
                <span className={styles.regionText}>{opt}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ===== 지역 선택 드롭다운 (디자인 유지) ===== */
function RegionSelect({
  value,
  onChange,
  placeholder = "지역 선택하기",
  options,
}: {
  value: string | null;
  onChange: (v: string) => void;
  placeholder?: string;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const label = value ?? placeholder;

  return (
    <div className={styles.regionWrap} ref={ref}>
      <button
        type="button"
        className={styles.regionTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.regionLabel}>{label}</span>
      </button>

      {open && (
        <div
          className={styles.regionMenu}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className={styles.selectext}>시/도</div>
          <div className={styles.subtext}>다중선택 가능</div>

          {options.map((opt) => {
            const checked = value === opt;
            return (
              <button
                key={opt}
                type="button"
                className={styles.regionOption}
                role="option"
                aria-selected={checked}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                <span className={`${styles.box} ${checked ? styles.boxOn : ""}`} />
                <span className={styles.regionText}>{opt}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
