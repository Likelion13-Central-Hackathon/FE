import React, { useMemo, useState } from "react";
import styles from "./ConsiderForm.module.scss";
import BasicButton from "../../../components/BasicButton";

type SupportItem = {
  key: string;
  label: string;
  icon?: string;
};

const SUPPORT_ITEMS: SupportItem[] = [
  { key: "facility", label: "사업화" },
  { key: "rnd", label: "기술개발(R&D)" },
  { key: "space", label: "시설·공간·보육" },
  { key: "mentor", label: "멘토링·컨설팅" },
  { key: "network", label: "행사·네트워크" },
  { key: "finance", label: "융자" },
  { key: "hr", label: "인력" },
  { key: "global", label: "글로벌" },
];

const RANK_OPTIONS = ["순위", "1순위", "2순위", "3순위", "4순위", "5순위"];
const CAREER_OPTIONS = ["예비창업", "초기(3년 이내)", "도약기(4~7년)", "혁신형(10년 이내)"];
const STATUS_OPTIONS = ["탐색단계", "기획&검증단계", "준비단계", "아이디어 단계", "실행단계", "성장단계"];

// ✅ onPrev, onNext 콜백을 props로 받음
const ConsiderForm: React.FC<{ onPrev: () => void; onNext: () => void }> = ({
  onPrev,
  onNext,
}) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [supportRanks, setSupportRanks] = useState<Record<string, string>>({});
  const [careers, setCareers] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [itemText, setItemText] = useState("");

  const toggleFromArray = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const handleRankChange = (key: string, rank: string) => {
    setSupportRanks((prev) => ({ ...prev, [key]: rank }));
  };

  // ✅ 다음 버튼에서 부모로 단계 전환 호출
  const handleNext = () => {
    const payload = { field: selectedField, support: supportRanks, careers, statuses, itemText };
    console.log("다음으로 넘길 값:", payload);
    onNext();
  };

  const disableNext = useMemo(() => false, []);

  return (
    <div className={styles.groupBody}>
      {/* 섹션들을 감싸는 부모: gap으로 섹션 간격 12px(0.625vw) 부여 */}
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
                  {it.icon ? (
                    <img src={it.icon} alt={it.label} />
                  ) : (
                    <div className={styles.iconPlaceholder} aria-hidden />
                  )}
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
            {CAREER_OPTIONS.map((c) => {
              const on = careers.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                  onClick={() => setCareers((prev) => toggleFromArray(prev, c))}
                  aria-pressed={on}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>

        {/* 섹션 4: 창업 현황 */}
        <section className={styles.section}>
          <h3 className={styles.label}>현재 창업 현황을 알려주세요.</h3>
          <div className={styles.chipRow}>
            {STATUS_OPTIONS.map((st) => {
              const on = statuses.includes(st);
              return (
                <button
                  key={st}
                  type="button"
                  className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                  onClick={() => setStatuses((prev) => toggleFromArray(prev, st))}
                  aria-pressed={on}
                >
                  {st}
                </button>
              );
            })}
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
          {/* ✅ 이전: 부모에서 InfoForm으로 돌려보냄 */}
          <BasicButton text="이전" onClick={onPrev} width="7.8125vw" height="2.1875vw" />
          {/* ✅ 다음: 부모에서 BaseResource로 전환 */}
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
