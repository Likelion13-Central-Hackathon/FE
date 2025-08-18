// ConsiderForm.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ConsiderForm.module.scss";
import BasicButton from "../../../components/BasicButton";
import StatusSelect from "../../../components/StatusSelect";
import type {
  StepComponentProps,
  FieldOpt,
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

/* ===== 분야 드롭다운 ===== */
function FieldSelect({
  value,
  onChange,
  placeholder = "분야 선택하기",
  options,
}: {
  value: string | null;
  onChange: (id: string) => void;
  placeholder?: string;
  options: readonly FieldOpt[];
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return options.filter((o) =>
      `${o.group} ${o.title} ${o.subtitle ?? ""}`.toLowerCase().includes(qq)
    );
  }, [options, q]);

  const grouped = useMemo(() => {
    const m = new Map<string, FieldOpt[]>();
    for (const it of filtered) {
      if (!m.has(it.group)) m.set(it.group, []);
      m.get(it.group)!.push(it);
    }
    return Array.from(m.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const selected = options.find((o) => o.id === value) || null;
  const triggerLabel = selected
    ? `${selected.group} / ${selected.order}`
    : placeholder;

  const flatList = useMemo(
    () =>
      grouped.reduce<FieldOpt[]>((acc, [, arr]) => (acc.push(...arr), acc), []),
    [grouped]
  );
  useEffect(() => setActiveIndex(0), [q, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = flatList[activeIndex];
      if (target) {
        onChange(target.id);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.querySelector<HTMLElement>(
      `[data-idx="${activeIndex}"]`
    );
    if (item) {
      const parent = listRef.current;
      const itTop = item.offsetTop;
      const itBottom = itTop + item.offsetHeight;
      if (itTop < parent.scrollTop) parent.scrollTop = itTop - 8;
      else if (itBottom > parent.scrollTop + parent.clientHeight)
        parent.scrollTop = itBottom - parent.clientHeight + 8;
    }
  }, [activeIndex]);

  return (
    <div className={styles.fieldWrap} ref={wrapRef} onKeyDown={onKeyDown}>
      <button
        type="button"
        className={`${styles.fieldTrigger} ${
          selected ? styles.fieldTriggerActive : ""
        }`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.fieldTriggerLabel}>{triggerLabel}</span>
      </button>

      {open && (
        <div
          className={styles.fieldMenu}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className={styles.fieldHeader}>
            <div className={styles.fieldHeaderTitle}>분류</div>
            <div className={styles.fieldSearch}>
              <input
                ref={inputRef}
                className={styles.searchInput}
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="검색 Ex. 농업"
              />
              <span className={styles.searchIcon} aria-hidden>
                🔍
              </span>
            </div>
          </div>

          <div className={styles.fieldList} ref={listRef}>
            {grouped.map(([group, arr], gi) => (
              <div key={group}>
                {gi > 0 && <div className={styles.fieldDivider} />}

                {arr.map((item, idxInGroup) => {
                  const idx =
                    grouped
                      .slice(0, gi)
                      .reduce((acc, [, a]) => acc + a.length, 0) + idxInGroup;
                  const active = item.id === value;
                  const focused = idx === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-idx={idx}
                      className={`${styles.fieldOption} ${
                        active ? styles.fieldOptionActive : ""
                      } ${focused ? styles.fieldOptionFocus : ""}`}
                      onClick={() => {
                        onChange(item.id);
                        setOpen(false);
                      }}
                    >
                      <div className={styles.fieldMain}>
                        <div className={styles.fieldGroup}>{item.group}</div>
                        <div className={styles.fieldTexts}>
                          <div className={styles.fieldTitle}>{item.title}</div>
                          {item.subtitle && (
                            <div className={styles.fieldSub}>
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.fieldRight}>{item.order}</div>
                    </button>
                  );
                })}
              </div>
            ))}
            {flatList.length === 0 && (
              <div className={styles.fieldEmpty}>검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== 본 컴포넌트 ===== */
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

  const handleNext = () => {
    onNext?.();
  };

  const disableNext = useMemo(() => false, []);

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
                  <div className={styles.rankWrap}>
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
                  className={styles.smallFontBtn}
                />
              ))}
            </div>
          </section>

          {/* 섹션 5: 아이템 텍스트 */}
          <section className={styles.section}>
            <p className={styles.label}>어떤 창업 아이템을 준비중인가요?</p>
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
