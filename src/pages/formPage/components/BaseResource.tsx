// BaseResource.tsx
import React from "react";
import styles from "./BaseResource.module.scss";
import BasicButton from "../../../components/BasicButton";
import StatusSelect from "../../../components/StatusSelect";
import type { StepComponentProps } from "../../../types/form";
import {
  TEAM_OPTIONS,
  TEAM_WIDTHS,
  CAPITAL_OPTIONS,
  CAPITAL_WIDTHS,
  LEVEL_OPTIONS,
  RESOURCES,
  CARD_WIDTHS_BY_KEY,
  CARD_HEIGHT,
} from "../../../data/formData";

type Resource = { key: string; title: string; desc: string };

const BaseResource: React.FC<StepComponentProps> = ({
  data,
  updateForm,
  onPrev,
}) => {
  const onSelectTeam = (v: string) =>
    updateForm({ team: data.team === v ? null : v });
  const onSelectCapital = (v: string) =>
    updateForm({ capital: data.capital === v ? null : v });

  const onChangeLevel = (key: string, v: string) => {
    const prev = data.levels ?? {};
    const next: Record<string, string> = { ...prev };

    if (prev[key] === v) {
      delete next[key];
    } else {
      next[key] = v;
    }
    updateForm({ levels: next });
  };

  const onNext = () => {
    const payload = {
      team: data.team,
      capital: data.capital,
      levels: data.levels,
    };
    console.log("BaseResource payload:", payload);
    // TODO: 제출/다음 단계 이동이 필요하면 여기서 처리
  };

  // 카드 렌더러
  const renderCard = (r: Resource) => {
    const v = (data.levels?.[r.key] ?? null) as string | null;
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
            options={[...LEVEL_OPTIONS] as unknown as string[]}
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
                  const on = data.team === opt;
                  return (
                    <BasicButton
                      key={opt}
                      text={opt}
                      onClick={() => onSelectTeam(opt)}
                      active={on}
                      className={styles.smallFontBtn}
                      width={TEAM_WIDTHS[idx]}
                      height="1.67vw"
                    />
                  );
                })}
              </div>
            </section>

            {/* 섹션 2: 자본 규모 */}
            <section className={styles.section}>
              <h3 className={styles.label}>
                현재 창업에 사용 가능한 자본 규모를 알려주세요.
              </h3>
              <div className={styles.chipRow}>
                {CAPITAL_OPTIONS.map((opt, idx) => {
                  const on = data.capital === opt;
                  return (
                    <BasicButton
                      key={opt}
                      text={opt}
                      onClick={() => onSelectCapital(opt)}
                      active={on}
                      className={styles.smallFontBtn}
                      width={CAPITAL_WIDTHS[idx]}
                      height="1.67vw"
                    />
                  );
                })}
              </div>
            </section>

            {/* 섹션 3: 자원 드롭다운 */}
            <section className={styles.section}>
              <h3 className={styles.label}>
                자본 이외에도 활용가능한 자원이 있다면 알려주세요.
              </h3>

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

      {/* 버튼 바 */}
      <footer className={styles.groupFooter}>
        <div className={styles.footerBtns}>
          <BasicButton
            text="이전"
            onClick={onPrev}
            width="5.26vw"
            height="1.93vw"
            className={styles.smallBtn}
          />
          <BasicButton
            text="다음"
            onClick={onNext}
            width="5.26vw"
            height="1.93vw"
            className={styles.smallBtn}
          />
          {/* BasicButton이 disabled를 지원한다면 prop 추가해서 제어할 수 있음 */}
        </div>
      </footer>
    </>
  );
};

export default BaseResource;
