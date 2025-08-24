import React, { useMemo, useState } from "react";
import styles from "./ConsiderForm.module.scss";
import BasicButton from "../../../components/BasicButton";
import StatusSelect from "../../../components/StatusSelect";
import type {
  StepComponentProps,
  RankCode,
  StartupStage,
  SupportKey,
} from "../../../types/form";
import {
  FIELD_OPTIONS,
  SUPPORT_ITEMS,
  CAREER_OPTIONS,
  STATUS_OPTIONS2,
  RANK_OPTIONS,
  STATUS_MODAL_BY_STAGE,
} from "../../../data/formData";

import CR1 from "../../../assets/images/form/consider-resource1.svg";
import CR2 from "../../../assets/images/form/consider-resource2.svg";
import CR3 from "../../../assets/images/form/consider-resource3.svg";
import CR4 from "../../../assets/images/form/consider-resource4.svg";
import CR5 from "../../../assets/images/form/consider-resource5.svg";
import CR6 from "../../../assets/images/form/consider-resource6.svg";
import CR7 from "../../../assets/images/form/consider-resource7.svg";
import CR8 from "../../../assets/images/form/consider-resource8.svg";
import FieldSelect from "./FieldSelect";

const ICON_MAP: Record<SupportKey, string> = {
  COMMERCIALIZATION: CR1,
  RND: CR2,
  FACILITY_INCUBATION: CR3,
  MENTORING_CONSULTING: CR4,
  EVENT_NETWORK: CR5,
  LOAN: CR6,
  TALENT: CR7,
  GLOBAL: CR8,
};

const ConsiderForm: React.FC<StepComponentProps> = ({
  data,
  updateForm,
  onPrev,
  onNext,
}) => {
  // UI용 모달 상태
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [pendingStage, setPendingStage] = useState<StartupStage | null>(null);

  // interestArea를 -> option id
  const selectedFieldId = useMemo(() => {
    const m = FIELD_OPTIONS.find(
      (o) => o.subtitle === data.interestArea || o.title === data.interestArea
    );
    return m?.id ?? null;
  }, [data.interestArea]);

  // 분야 선택 시 id를 area로 저장
  const onSelectField = (id: string) => {
    const opt = FIELD_OPTIONS.find((o) => o.id === id);
    const area = (opt?.subtitle || opt?.title || "").trim();
    updateForm({ interestArea: area });
  };

  // 모달 열기
  const onStatusClick = (stage: StartupStage) => {
    setPendingStage(stage);
    setStatusModalOpen(true);
  };

  // 모달 확인시 라벨 → enum 변환 후 저장
  const confirmStatus = () => {
    if (!pendingStage) return;
    updateForm({ stage: pendingStage });
    setStatusModalOpen(false);
    setPendingStage(null);
  };

  // 필수값 충족 여부
  const hasInterest = useMemo(
    () => !!data.interestArea?.trim(),
    [data.interestArea]
  );
  const hasBusinessAge = data.businessAge !== null; // 업력
  const hasStage = data.stage !== null; // 현황
  const hasTitle = data.title?.trim().length > 0; // 제목
  const hasDescription = useMemo(
    // 아이템 설명
    () => data.description.trim().length > 0,
    [data.description]
  );

  // 다음 버튼 활성 조건
  const canProceed =
    hasInterest && hasBusinessAge && hasStage && hasTitle && hasDescription;
  const disableNext = !canProceed;

  const handleNext = () => {
    if (!canProceed) return;
    onNext?.();
  };

  return (
    <>
      <div className={styles.groupBody}>
        <div className={styles.sectionsWrapper}>
          {/* 섹션 1: 분야 선택 */}
          <section className={styles.section}>
            <p className={styles.label}>
              어떤 분야에서 창업을 고려하고 있는지 알려주세요.
            </p>
            <FieldSelect
              value={selectedFieldId}
              onChange={onSelectField}
              options={FIELD_OPTIONS}
            />
          </section>

          {/* 섹션 2: 지원 형태 */}
          <section className={styles.section}>
            <p className={styles.label}>
              어떤 형태의 지원이 필요한 지 알려주세요.
            </p>
            <div className={styles.supportGrid}>
              {SUPPORT_ITEMS.map((it) => (
                <div key={it.key} className={styles.supportCard}>
                  <div className={styles.supportIcon}>
                    <img src={ICON_MAP[it.key]} alt={it.label} />
                  </div>
                  <div className={styles.supportLabel}>{it.label}</div>

                  <StatusSelect<RankCode>
                    value={data.supportNeeds?.[it.key] ?? null}
                    onChange={(code) =>
                      updateForm({
                        supportNeeds: {
                          ...(data.supportNeeds ?? {}),
                          [it.key]: code,
                        },
                      })
                    }
                    options={RANK_OPTIONS}
                    placeholder="순위"
                    width="3.65vw"
                    height="1.15vw"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 섹션 3: 창업 업력 (토글) */}
          <section className={styles.section}>
            <p className={styles.label}>창업 업력에 대해서도 알려주세요.</p>
            <div className={styles.chipRow}>
              {CAREER_OPTIONS.map((c) => (
                <BasicButton
                  key={c.label}
                  text={c.label}
                  active={data.businessAge === c.value}
                  onClick={() =>
                    updateForm({
                      businessAge:
                        data.businessAge === c.value ? null : c.value,
                    })
                  }
                  width={c.width}
                  height="1.67vw"
                  className={styles.smallFontBtn}
                />
              ))}
            </div>
          </section>

          {/* 섹션 4: 현재 창업 현황 (모달 통해 확정) */}
          <section className={styles.section}>
            <p className={styles.label}>현재 창업 현황을 알려주세요.</p>
            <div className={styles.chipRow}>
              {STATUS_OPTIONS2.map((st) => (
                <BasicButton
                  key={st.value}
                  text={st.label}
                  active={data.stage === st.value}
                  onClick={() => onStatusClick(st.value)}
                  width={st.width}
                  height="1.67vw"
                  className={`${styles.smallFontBtn} ${styles.withArrow}`}
                />
              ))}
            </div>
          </section>

          {/* 섹션 5: 아이템 텍스트 */}
          <section className={styles.section}>
            <p className={styles.label}>어떤 창업 아이템을 준비중인가요?</p>
            <input
              type="text"
              placeholder="창업 아이템 제목 (띄어쓰기 포함 30자 이내)"
              className={styles.titleInput}
              maxLength={30}
              value={data.title}
              onChange={(e) => updateForm({ title: e.target.value })}
            />
            <textarea
              className={styles.textarea}
              placeholder={
                "본 지원사업을 통해 개발 또는 구체화하고자 하는 제품·서비스 개요(사용 용도, 사양, 가격 등), \n핵심 기능·성능, 고객 제공 혜택 등\n※ 예시 : 가벼움(고객 제공 혜택)을 위해서 용량을 줄이는 재료(핵심 기능)를 사용"
              }
              value={data.description}
              onChange={(e) => updateForm({ description: e.target.value })}
            />
          </section>
        </div>
      </div>

      {/* 하단 버튼 */}
      <footer className={styles.pageFooter}>
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
            disabled={disableNext}
            className={styles.smallBtn}
          />
        </div>
      </footer>

      {/* ===== 상태 안내 모달 ===== */}
      {statusModalOpen && pendingStage && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setStatusModalOpen(false);
            setPendingStage(null);
          }}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>
              {STATUS_MODAL_BY_STAGE[pendingStage].title}
            </div>
            <div className={styles.modalBody}>
              {STATUS_MODAL_BY_STAGE[pendingStage].lines.map((t, i) => (
                <div key={i} className={styles.modalLine}>
                  • {t}
                </div>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.modalSelect} onClick={confirmStatus}>
                선택하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsiderForm;
