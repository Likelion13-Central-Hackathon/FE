import React, { useMemo, useState } from "react";
import styles from "./BaseResource.module.scss";
import BasicButton from "../../../components/BasicButton";

type Resource = { key: string; title: string; desc: string };

const TEAM_OPTIONS = ["1-2명", "3-5명", "6-10명", "11-20명", "팀원 모집중"];
const CAPITAL_OPTIONS = [
  "100만원 이내",
  "300만원 이내",
  "500만원 이내",
  "1,000만원 이내",
  "무제한",
  "1,000만원 이상",
];

const RESOURCES: Resource[] = [
  { key: "dev",       title: "기술·개발 역량",      desc: "웹/앱 개발, 데이터 분석, 제품개발" },
  { key: "design",    title: "디자인 역량",        desc: "로고, 패키지, 상세페이지, UX/UI, 영상제작, 홍보물" },
  { key: "marketing", title: "홍보·마케팅 채널",   desc: "콘텐츠 제작, 채널 운영, UX/UI, 영상제작, 홍보물" },
  { key: "network",   title: "인적자원 및 네트워크", desc: "협업 가능한 팀원/멘토, 전문가 및 창업자 네트워크" },
  { key: "space",     title: "공간·장비",           desc: "업무/보관 공간, 장비, 협업 환경" },
  { key: "knowledge", title: "지식·경험",           desc: "특정 분야 경험(금융, 특허, 경영) 및 전문지식" },
];

const LEVEL_OPTIONS = ["순위","상", "중", "하","없음"];

// ✅ onPrev 콜백을 props로 받아 '이전' 버튼에서 ConsiderForm으로 복귀
const BaseResource: React.FC<{ onPrev: () => void }> = ({ onPrev }) => {
  const [team, setTeam] = useState<string | null>(null);
  const [capital, setCapital] = useState<string | null>(null);
  const [levels, setLevels] = useState<Record<string, string>>({});

  const onSelectTeam = (v: string) => setTeam(prev => (prev === v ? null : v));
  const onSelectCapital = (v: string) => setCapital(prev => (prev === v ? null : v));
  const onChangeLevel = (key: string, v: string) => setLevels(prev => ({ ...prev, [key]: v }));

  const disableNext = useMemo(() => false, []);

  const onNext = () => {
    const payload = { team, capital, levels };
    console.log("BaseResource payload:", payload);
  };

  return (
    <div className={styles.groupBody}>
      {/* ✅ 전체 크기 축소 래퍼 (디자인 그대로, 사이즈만 축소) */}
      <div className={styles.scaleWrap}>
        <div className={styles.sectionsWrapper}>
          {/* 섹션 1: 팀 인원 */}
          <section className={styles.section}>
            <h3 className={styles.label}>함께하는 팀원은 몇 명 인가요?</h3>
            <div className={styles.chipRow}>
              {TEAM_OPTIONS.map(opt => {
                const on = team === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                    onClick={() => onSelectTeam(opt)}
                    aria-pressed={on}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 섹션 2: 자본 규모 */}
          <section className={styles.section}>
            <h3 className={styles.label}>현재 창업에 사용 가능한 자본 규모를 알려주세요.</h3>
            <div className={styles.chipRow}>
              {CAPITAL_OPTIONS.map(opt => {
                const on = capital === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                    onClick={() => onSelectCapital(opt)}
                    aria-pressed={on}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 섹션 3: 활용 가능한 자원 */}
          <section className={styles.section}>
            <h3 className={styles.label}>자본 이외에도 활용가능한 자원이 있다면 알려주세요.</h3>
            <div className={styles.resourceGrid}>
              {RESOURCES.map(r => {
                const v = levels[r.key] ?? "순위";
                const picked = v !== "순위";
                return (
                  <div key={r.key} className={styles.resourceCard}>
                    <div className={styles.resourceHead}>
                      <div className={styles.resourceTitle}>{r.title}</div>
                      <div className={styles.resourceDesc}>{r.desc}</div>
                    </div>

                    <div className={styles.rankWrap}>
                      {picked ? (
                        <button
                          type="button"
                          className={`${styles.rankChip} ${styles.rankChipOn}`}
                          onClick={() => onChangeLevel(r.key, "순위")}
                          aria-pressed={true}
                          title="클릭하면 순위 초기화"
                        >
                          {v}
                        </button>
                      ) : (
                        <select
                          className={styles.rankSelect}
                          value={v}
                          onChange={(e) => onChangeLevel(r.key, e.target.value)}
                        >
                          {LEVEL_OPTIONS.map(lv => (
                            <option value={lv} key={lv}>{lv}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <footer className={styles.groupFooter}>
          <div className={styles.footerBtns}>
            <BasicButton text="이전" onClick={onPrev} width="7.8125vw" height="2.1875vw" />
            <BasicButton text="다음" onClick={onNext} width="7.8125vw" height="2.1875vw" disabled={disableNext} />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BaseResource;
