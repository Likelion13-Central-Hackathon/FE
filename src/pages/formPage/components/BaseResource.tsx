// BaseResource.tsx
import React, { useMemo, useState } from "react";
import styles from "./BaseResource.module.scss";
import BasicButton from "../../../components/BasicButton";
import StatusSelect from "../../../components/StatusSelect";

type Resource = { key: string; title: string; desc: string };

const TEAM_OPTIONS = ["1-2명", "3-5명", "6-10명", "11-20명", "팀원 모집중"];
const CAPITAL_OPTIONS = [
  "100만원 이내",
  "300만원 이내",
  "500만원 이내",
  "1,000만원 이내",
  "1,000만원 이상",
  "무자본",
];
const LEVEL_OPTIONS = ["상", "중", "하", "없음"];

const RESOURCES: Resource[] = [
  { key: "dev",       title: "기술·개발 역량",        desc: "앱 및 웹 개발, 데이터 분석,<br /> 제품개발" },
  { key: "design",    title: "디자인 역량",          desc: "로고, 패키지, 상세페이지<br /> UX/UI, 영상제작, 홍보물" },
  { key: "marketing", title: "홍보·마케팅 채널",     desc: "로고, 패키지, 상세페이지<br /> UX/UI, 영상제작, 홍보물" },
  { key: "network",   title: "인적자원 및 네트워크", desc: "협업이 가능한 팀원&멘토<br /> 전문가 및 창업자 네트워크" },
  { key: "space",     title: "공간·장비",             desc: "협업이 가능한 팀원&멘토<br /> 전문가 및 창업자 네트워크" },
  { key: "knowledge", title: "지식·경험",             desc: "특정산업의 경험<br />(전공, 활동, 경력) 및 전문지식" },
];

const CARD_WIDTHS_BY_KEY: Record<string, string> = {
  dev: "6.15vw",
  design: "6.15vw",
  marketing: "7.03vw",
  network: "8.59vw",
  space: "6.72vw",
  knowledge: "6.89vw",
};

const CARD_HEIGHT = "5vw";
const TEAM_WIDTHS    = ["4.43vw", "4.53vw", "4.84vw", "5.05vw", "5.63vw"];
const CAPITAL_WIDTHS = ["6.15vw", "6.25vw", "6.25vw", "6.67vw",  "6.67vw", "4.43vw"];

const BaseResource: React.FC<{ onPrev: () => void }> = ({ onPrev }) => {
  const [team, setTeam] = useState<string | null>(null);
  const [capital, setCapital] = useState<string | null>(null);
  const [levels, setLevels] = useState<Record<string, string | null>>({});

  const onSelectTeam = (v: string) => setTeam(prev => (prev === v ? null : v));
  const onSelectCapital = (v: string) => setCapital(prev => (prev === v ? null : v));
  const onChangeLevel = (key: string, v: string) => {
    setLevels(prev => ({ ...prev, [key]: prev[key] === v ? null : v }));
  };

  const disableNext = useMemo(() => false, []);

  const onNext = () => {
    const payload = { team, capital, levels };
    console.log("BaseResource payload:", payload);
  };

  // 카드 렌더러 (공통)
  const renderCard = (r: Resource) => {
    const v = levels[r.key] ?? null;
    return (
      <div
        key={r.key}
        className={styles.resourceCard}
        style={{
          width: CARD_WIDTHS_BY_KEY[r.key] ?? "8.6vw",
          height: CARD_HEIGHT,
        }}
      >
        <div className={styles.resourceHead}>
          <div className={styles.resourceTitle}>{r.title}</div>
          <div
            className={styles.resourceDesc}
            dangerouslySetInnerHTML={{ __html: r.desc }}
          />
        </div>

        <div className={styles.rankWrap}>
          <StatusSelect
            value={v}
            onChange={(val) => onChangeLevel(r.key, val)}
            options={LEVEL_OPTIONS}
            placeholder="순위"
            width="3.65vw"
            height="1.15vw"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 본문 */}
      <div className={styles.groupBody}>
        <div className={styles.scaleWrap}>
          <div className={styles.sectionsWrapper}>
            {/* 섹션 1: 팀 인원 */}
            <section className={styles.section}>
              <h3 className={styles.label}>함께하는 팀원은 몇 명 인가요?</h3>
              <div className={styles.chipRow}>
                {TEAM_OPTIONS.map((opt, idx) => {
                  const on = team === opt;
                  return (
                    <BasicButton
                      key={opt}
                      text={opt}
                      onClick={() => onSelectTeam(opt)}
                      active={on}
                      className={on ? styles.chipOn : undefined}
                      width={TEAM_WIDTHS[idx]}
                      height="2.1875vw"
                    />
                  );
                })}
              </div>
            </section>

            {/* 섹션 2: 자본 규모 */}
            <section className={styles.section}>
              <h3 className={styles.label}>현재 창업에 사용 가능한 자본 규모를 알려주세요.</h3>
              <div className={styles.chipRow}>
                {CAPITAL_OPTIONS.map((opt, idx) => {
                  const on = capital === opt;
                  return (
                    <BasicButton
                      key={opt}
                      text={opt}
                      onClick={() => onSelectCapital(opt)}
                      active={on}
                      className={on ? styles.chipOn : undefined}
                      width={CAPITAL_WIDTHS[idx]}
                      height="2.1875vw"
                    />
                  );
                })}
              </div>
            </section>

            {/* 섹션 3: 자원 드롭다운 */}
            <section className={styles.section}>
              <h3 className={styles.label}>자본 이외에도 활용가능한 자원이 있다면 알려주세요.</h3>

              {/* 2x3: 줄별 컨테이너 - 윗줄과 아랫줄의 좌우 간격을 다르게 */}
              <div className={styles.resourceGrid}>
                {/* 윗줄 (좌우 갭 2.76vw) */}
                <div className={styles.resourceRowTop}>
                  {RESOURCES.slice(0, 3).map(renderCard)}
                </div>

                {/* 아랫줄 (좌우 갭 1.35vw) */}
                <div className={styles.resourceRowBottom}>
                  {RESOURCES.slice(3, 6).map(renderCard)}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 버튼 바(※ groupBody 바깥) */}
      <footer className={styles.groupFooter}>
        <div className={styles.footerBtns}>
          <BasicButton text="이전" onClick={onPrev} width="5.26vw" height="1.93vw" />
          <BasicButton text="다음" onClick={onNext} width="5.26vw" height="1.93vw" disabled={false} />
        </div>
      </footer>
    </>
  );
};

export default BaseResource;
