import React, { useMemo, useState } from "react";
import styles from "./ConsiderForm.module.scss";
import BasicButton from "../../../components/BasicButton";

import CR1 from "../../../assets/images/consider-resource1.svg";
import CR2 from "../../../assets/images/consider-resource2.svg";
import CR3 from "../../../assets/images/consider-resource3.svg";
import CR4 from "../../../assets/images/consider-resource4.svg";
import CR5 from "../../../assets/images/consider-resource5.svg";
import CR6 from "../../../assets/images/consider-resource6.svg";
import CR7 from "../../../assets/images/consider-resource7.svg";
import CR8 from "../../../assets/images/consider-resource8.svg";


/* ── 타입 ──────────────────────────────────────────────────────────── */
type SupportItem = {
  key: string;
  label: string;
  icon: string; // 아이콘을 반드시 갖도록 변경
};

/* ── 데이터 ────────────────────────────────────────────────────────── */
const SUPPORT_ITEMS: SupportItem[] = [
  { key: "facility", label: "사업화",           icon: CR1 },
  { key: "rnd",      label: "기술개발(R&D)",   icon: CR2 },
  { key: "space",    label: "시설·공간·보육",  icon: CR3 },
  { key: "mentor",   label: "멘토링·컨설팅",   icon: CR4 },
  { key: "network",  label: "행사·네트워크",   icon: CR5 },
  { key: "finance",  label: "융자",            icon: CR6 },
  { key: "hr",       label: "인력",            icon: CR7 },
  { key: "global",   label: "글로벌",          icon: CR8 },
];

const RANK_OPTIONS = ["순위", "상", "중", "하", "없음"];

// 창업 업력 옵션 + 각 버튼 폭 지정
const CAREER_OPTIONS = [
  { label: "예비창업",        width: "6vw" },
  { label: "초기(3년 이내)",  width: "8vw" },
  { label: "도약기(4~7년)",   width: "8vw" },
  { label: "혁신형(10년 이내)", width: "9vw" },
];

// 창업 현황 옵션 + 각 버튼 폭 지정
const STATUS_OPTIONS = [
  { label: "탐색단계",      width: "6vw" },
  { label: "기획&검증단계", width: "8vw" },
  { label: "준비단계",      width: "6vw" },
  { label: "아이디어 단계", width: "9vw" },
  { label: "실행단계",      width: "7vw" },
  { label: "성장단계",      width: "7vw" },
];

/* ── 컴포넌트 ──────────────────────────────────────────────────────── */
// onPrev, onNext 콜백을 props로 받음
const ConsiderForm: React.FC<{ onPrev: () => void; onNext: () => void }> = ({
  onPrev,
  onNext,
}) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [supportRanks, setSupportRanks] = useState<Record<string, string>>({});

  // ✅ 단일 선택으로 사용하므로 타입을 string | null 로 정리
  const [careers, setCareers] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<string | null>(null);

  const [itemText, setItemText] = useState("");

  const handleRankChange = (key: string, rank: string) => {
    setSupportRanks((prev) => ({ ...prev, [key]: rank }));
  };

  // 다음 버튼에서 부모로 단계 전환 호출
  const handleNext = () => {
    const payload = {
      field: selectedField,
      support: supportRanks,
      careers,
      statuses,
      itemText,
    };
    console.log("다음으로 넘길 값:", payload);
    onNext();
  };

  const disableNext = useMemo(() => false, []);

  return (
    <div className={styles.groupBody}>
      {/* 섹션들을 감싸는 부모 */}
      <div className={styles.sectionsWrapper}>
        {/* 섹션 1: 분야 선택 */}
        <section className={styles.section}>
          <h3 className={styles.label}>어떤 분야에서 창업을 고려하고 있는지 알려주세요.</h3>
          <button
            type="button"
            className={styles.primaryChip}
            onClick={() => setSelectedField("분야 미정")}
          >
            분야 선택하기
          </button>
        </section>

        {/* 섹션 2: 지원 형태 */}
        <section className={styles.section}>
          <h3 className={styles.label}>어떤 형태의 지원이 필요한 지 알려주세요.</h3>
          <div className={styles.supportGrid}>
            {SUPPORT_ITEMS.map((it) => (
              <div key={it.key} className={styles.supportCard}>
                <div className={styles.supportIcon}>
                  <img src={it.icon} alt={it.label} />
                </div>

                <div className={styles.supportLabel}>{it.label}</div>

                <div className={styles.rankWrap}>
                  <select
                    className={styles.rankSelect}
                    value={supportRanks[it.key] ?? "순위"}
                    onChange={(e) => handleRankChange(it.key, e.target.value)}
                  >
                    {RANK_OPTIONS.map((r) => (
                      <option value={r} key={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 섹션 3: 창업 업력 */}
        <section className={styles.section}>
          <h3 className={styles.label}>창업 업력에 대해서도 알려주세요.</h3>
          <div className={styles.chipRow}>
            {CAREER_OPTIONS.map((c) => (
              <BasicButton
                key={c.label}
                text={c.label}
                active={careers === c.label}
                onClick={() =>
                  setCareers((prev) => (prev === c.label ? null : c.label))
                }
                width={c.width}
                height="2.1875vw"
              />
            ))}
          </div>
        </section>

        {/* 섹션 4: 현재 창업 현황 */}
        <section className={styles.section}>
          <h3 className={styles.label}>현재 창업 현황을 알려주세요.</h3>
          <div className={styles.chipRow}>
            {STATUS_OPTIONS.map((st) => (
              <BasicButton
                key={st.label}
                text={st.label}
                active={statuses === st.label}
                onClick={() =>
                  setStatuses((prev) => (prev === st.label ? null : st.label))
                }
                width={st.width}
                height="2.1875vw"
              />
            ))}
          </div>
        </section>

        {/* 섹션 5: 아이템 텍스트 */}
        <section className={styles.section}>
          <h3 className={styles.label}>어떤 창업 아이템을 준비중인가요?</h3>
          <textarea
            className={styles.textarea}
            placeholder="ex) 지문인식을 통해 개인 또는 구체화하고자 하는 제품·서비스 개요..."
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
          />
          <div className={styles.note}>
            * 입력 예시는 가이드일 뿐이며 실제 작성 형식은 자유입니다.
          </div>
        </section>
      </div>

      <footer className={styles.groupFooter}>
        <div className={styles.footerBtns}>
          <BasicButton text="이전" onClick={onPrev} width="7.8125vw" height="2.1875vw" />
          <BasicButton
            text="다음"
            onClick={handleNext}
            width="7.8125vw"
            height="2.1875vw"
            disabled={disableNext}
          />
        </div>
      </footer>
    </div>
  );
};

export default ConsiderForm;
