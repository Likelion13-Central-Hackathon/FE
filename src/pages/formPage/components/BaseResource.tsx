// BaseResource.tsx
import React from "react";
import styles from "./BaseResource.module.scss";
import BasicButton from "../../../components/BasicButton";
import StatusSelect from "../../../components/StatusSelect";
import type {
  CapitalScale,
  RankCode,
  ResourceKey,
  StepComponentProps,
  TeamSize,
} from "../../../types/form";
import {
  TEAM_OPTIONS,
  CAPITAL_OPTIONS,
  RESOURCES,
  CARD_WIDTHS_BY_KEY,
  CARD_HEIGHT,
  RANK_OPTIONS,
} from "../../../data/formData";

type Resource = { key: ResourceKey; title: string; desc: string };

const BaseResource: React.FC<StepComponentProps> = ({
  data,
  updateForm,
  onPrev,
  onNext,
}) => {
  // 팀 선택
  const onSelectTeam = (v: TeamSize) =>
    updateForm({ teamSize: data.teamSize === v ? null : v });

  // 자본 선택
  const onSelectCapital = (v: CapitalScale) =>
    updateForm({ capital: data.capital === v ? null : v });

  // 자원 선택
  const onChangeLevel = (key: ResourceKey, v: RankCode) => {
    const prev = data.resources ?? {};
    const next: Partial<Record<ResourceKey, RankCode>> = { ...prev };
    if (prev[key] === v) {
      delete next[key];
    } else {
      next[key] = v;
    }
    updateForm({ resources: next });
  };

  // 필수값 충족 여부, 다음 버튼 활성 조건
  const canSubmit = !!data.teamSize && !!data.capital;
  const disableNext = !canSubmit;

  const handleNext = () => {
    if (!canSubmit) return;
    onNext?.();
  };

  // 카드 렌더러
  const renderCard = (r: Resource) => {
    const v = (data.resources?.[r.key] ?? null) as RankCode | null;
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
          <StatusSelect<RankCode>
            value={v}
            onChange={(val) => onChangeLevel(r.key, val)}
            options={RANK_OPTIONS}
            placeholder="순위"
            width="3.65vw"
            height="1.15vw"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <>
        {/* 본문 */}
        <div className={styles.groupBody}>
          <div className={styles.scaleWrap}>
            <div className={styles.sectionsWrapper}>
              {/* 섹션 1: 팀 인원 */}
              <section className={styles.section}>
                <h3 className={styles.label}>함께하는 팀원은 몇 명 인가요?</h3>
                <div className={styles.chipRow}>
                  {TEAM_OPTIONS.map((opt) => {
                    const on = data.teamSize === opt.value;
                    return (
                      <BasicButton
                        key={opt.value}
                        text={opt.label}
                        onClick={() => onSelectTeam(opt.value)}
                        active={on}
                        className={styles.smallFontBtn}
                        width={opt.width}
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
                  {CAPITAL_OPTIONS.map((opt) => {
                    const on = data.capital === opt.value;
                    return (
                      <BasicButton
                        key={opt.value}
                        text={opt.label}
                        onClick={() => onSelectCapital(opt.value)}
                        active={on}
                        className={styles.smallFontBtn}
                        width={opt.width}
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
                  onClick={handleNext}
                  width="5.26vw"
                  height="1.93vw"
                  className={styles.smallBtn}
                  disabled={disableNext}
                />
              </div>
            </footer>
          </div>
        </div>
      </>
    </div>
  );
};

export default BaseResource;
