import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ConsiderForm.module.scss";
import BasicButton from "../../../components/BasicButton";
import StatusSelect from "../../../components/StatusSelect";
import { FormData, UpdateForm } from "../FormPage";

import CR1 from "../../../assets/images/consider-resource1.svg";
import CR2 from "../../../assets/images/consider-resource2.svg";
import CR3 from "../../../assets/images/consider-resource3.svg";
import CR4 from "../../../assets/images/consider-resource4.svg";
import CR5 from "../../../assets/images/consider-resource5.svg";
import CR6 from "../../../assets/images/consider-resource6.svg";
import CR7 from "../../../assets/images/consider-resource7.svg";
import CR8 from "../../../assets/images/consider-resource8.svg";

/* ===== 타입 ===== */
type SupportItem = { key: string; label: string; icon: string };
type FieldOpt = { id: string; group: string; title: string; subtitle?: string; order: number };

/* ===== 데이터 ===== */
const SUPPORT_ITEMS: SupportItem[] = [
  { key: "facility", label: "사업화", icon: CR1 },
  { key: "rnd", label: "기술개발(R&D)", icon: CR2 },
  { key: "space", label: "시설·공간·보육", icon: CR3 },
  { key: "mentor", label: "멘토링·컨설팅", icon: CR4 },
  { key: "network", label: "행사·네트워크", icon: CR5 },
  { key: "finance", label: "융자", icon: CR6 },
  { key: "hr", label: "인력", icon: CR7 },
  { key: "global", label: "글로벌", icon: CR8 },
];

const RANK_OPTIONS = ["상", "중", "하", "필요없음"] as const;

const CAREER_OPTIONS = [
  { label: "예비창업", width: "4.95vw" },
  { label: "초기(3년 이내)", width: "6.46vw" },
  { label: "도약기(4~7년이내)", width: "7.55vw" },
  { label: "신산업(10년 이내)", width: "7.24vw" },
];

const STATUS_OPTIONS = [
  { label: "탐색단계 >",      width: "3.80vw" },
  { label: "기획&검증단계 >", width: "5.42vw" },
  { label: "준비단계 >",      width: "3.80vw" },
  { label: "아이디어 단계 >", width: "5.00vw" },
  { label: "실행단계 >",      width: "3.80vw" },
  { label: "성장단계 >",      width: "3.80vw" },
];

/* 분야 드롭다운(단일) 옵션 예시 */
const FIELD_OPTIONS: FieldOpt[] = [
  { id: "A-1", group: "A", title: "농업,임업", subtitle: "작물 재배업", order: 1 },
  { id: "A-2", group: "A", title: "농업,임업", subtitle: "축산업", order: 2 },
  { id: "A-3", group: "A", title: "농업,임업", subtitle: "임업", order: 3 },
  { id: "A-4", group: "A", title: "농업,임업", subtitle: "어업", order: 4 },
  { id: "B-5", group: "B", title: "광업", subtitle: "석탄, 원유 및 천연가스 광업", order: 5 },
  { id: "B-6", group: "B", title: "광업", subtitle: "금속광업", order: 6 },
];

/* ===== 분야 단일 드롭다운 (강화 버전) ===== */
function FieldSelect({
  value,
  onChange,
  placeholder = "분야 선택하기",
  options,
}: {
  value: string | null;
  onChange: (id: string) => void;
  placeholder?: string;
  options: FieldOpt[];
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return options.filter(o =>
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

  const selected = options.find(o => o.id === value) || null;
  const triggerLabel = selected ? `${selected.group} / ${selected.order}` : placeholder;

  const flatList = useMemo(() => grouped.flatMap(([, arr]) => arr), [grouped]);
  useEffect(() => setActiveIndex(0), [q, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
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
    const item = listRef.current.querySelector<HTMLElement>(`[data-idx="${activeIndex}"]`);
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
        className={`${styles.fieldTrigger} ${selected ? styles.fieldTriggerActive : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.fieldTriggerLabel}>{triggerLabel}</span>
      </button>

      {open && (
        <div className={styles.fieldMenu} role="listbox" onMouseDown={(e) => e.preventDefault()}>
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
              <span className={styles.searchIcon} aria-hidden>🔍</span>
            </div>
          </div>

          <div className={styles.fieldList} ref={listRef}>
            {grouped.map(([group, arr], gi) => (
              <div key={group}>
                {gi > 0 && <div className={styles.fieldDivider} />}

                {arr.map((item, idxInGroup) => {
                  const idx =
                    grouped.slice(0, gi).reduce((acc, [, a]) => acc + a.length, 0) +
                    idxInGroup;
                  const active = item.id === value;
                  const focused = idx === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-idx={idx}
                      className={`${styles.fieldOption} ${active ? styles.fieldOptionActive : ""} ${focused ? styles.fieldOptionFocus : ""}`}
                      onClick={() => { onChange(item.id); setOpen(false); }}
                    >
                      <div className={styles.fieldMain}>
                        <div className={styles.fieldGroup}>{item.group}</div>
                        <div className={styles.fieldTexts}>
                          <div className={styles.fieldTitle}>{item.title}</div>
                          {item.subtitle && <div className={styles.fieldSub}>{item.subtitle}</div>}
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

/* ===== 상태 안내 모달 콘텐츠(6개 전부) ===== */
const STATUS_MODAL: Record<string, { title: string; lines: string[] }> = {
  "탐색단계 >": {
    title: "탐색 단계",
    lines: ["창업에 대한 막연한 관심.", "다양한 정보 탐색 (온라인 콘텐츠, 교육 등).", "창업 분야/아이템에 대한 고민 시작."],
  },
  "기획&검증단계 >": {
    title: "기획 & 검증 단계",
    lines: ["문제/해결 가설 정리 및 시장조사.", "고객 인터뷰 · 경쟁 분석으로 적합성 검증.", "PoC/프로토타입으로 기본 기능 검증."],
  },
  "준비단계 >": {
    title: "준비 단계",
    lines: ["사업계획서/로드맵 수립, 팀 구성.", "사업자등록/법인 설립 검토, 재무·자금 계획.", "정부지원사업/공모 준비."],
  },
  "아이디어 단계 >": {
    title: "아이디어 단계",
    lines: ["해결하고 싶은 문제를 정의.", "아이디어 초안 정리와 빠른 검증 시도.", "간단한 사용자 리서치/인터뷰."],
  },
  "실행단계 >": {
    title: "실행 단계",
    lines: ["MVP 제작 및 베타 테스트.", "초기 고객 확보와 피드백 수집.", "핵심 지표(KPI) 설정/개선."],
  },
  "성장단계 >": {
    title: "성장 단계",
    lines: ["매출 확장, 채널 다각화.", "투자 유치 및 팀 확장.", "조직/운영 체계 고도화."],
  },
};

const ConsiderForm: React.FC<{
  data: FormData;
  updateForm: UpdateForm;
  onPrev: () => void;
  onNext: () => void;
}> = ({ data, updateForm, onPrev, onNext }) => {
  // UI용(모달) 로컬 상태만 유지
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);

  const handleRankChange = (key: string, rank: string) => {
    updateForm({ supportRanks: { ...data.supportRanks, [key]: rank } });
  };

  const onStatusClick = (label: string) => {
    setPendingStatus(label);
    setStatusModalOpen(true);
  };

  const confirmStatus = () => {
    if (pendingStatus) updateForm({ statuses: pendingStatus });
    setStatusModalOpen(false);
    setPendingStatus(null);
  };

  const handleNext = () => {
    const payload = {
      field: data.selectedField,
      support: data.supportRanks,
      careers: data.careers,
      statuses: data.statuses,
      itemText: data.itemText,
    };
    console.log("다음으로 넘길 값:", payload);
    onNext();
  };

  const disableNext = useMemo(() => false, []);

  return (
    <>
      <div className={styles.groupBody}>
        <div className={styles.sectionsWrapper}>
          {/* 섹션 1: 분야 선택 */}
          <section className={styles.section}>
            <h3 className={styles.label}>어떤 분야에서 창업을 고려하고 있는지 알려주세요.</h3>
            <FieldSelect
              value={data.selectedField}
              onChange={(id) => updateForm({ selectedField: id })}
              options={FIELD_OPTIONS}
            />
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
                    <StatusSelect
                      value={data.supportRanks[it.key] ?? null}
                      onChange={(v) => handleRankChange(it.key, v)}
                      options={[...RANK_OPTIONS] as unknown as string[]}
                      placeholder="순위"
                      width="3.65vw"
                      height="1.15vw"
                      menuZIndex={10000}
                    />
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
                  active={data.careers === c.label}
                  onClick={() =>
                    updateForm({ careers: data.careers === c.label ? null : c.label })
                  }
                  width={c.width}
                  height="1.67vw"
                  className={styles.smallFontBtn}
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
                  active={data.statuses === st.label}
                  onClick={() => onStatusClick(st.label)}
                  width={st.width}
                  height="1.67vw"
                  className={styles.smallFontBtn}
                />
              ))}
            </div>
          </section>

          {/* 섹션 5: 아이템 텍스트 */}
          <section className={styles.section}>
            <h3 className={styles.label}>어떤 창업 아이템을 준비중인가요?</h3>
            <textarea
              className={styles.textarea}
              placeholder={
                "본 지원사업을 통해 개발 또는 구체화하고자 하는 제품·서비스 개요(사용 용도, 사양, 가격 등), \n핵심 기능·성능, 고객 제공 혜택 등\n※ 예시 : 가벼움(고객 제공 혜택)을 위해서 용량을 줄이는 재료(핵심 기능)를 사용"
              }
              value={data.itemText}
              onChange={(e) => updateForm({ itemText: e.target.value })}
            />
          </section>
        </div>
      </div>

      {/* 하단 버튼 */}
      <footer className={styles.pageFooter}>
        <div className={styles.footerBtns}>
          <BasicButton text="이전" onClick={onPrev} width="5.26vw" height="1.93vw" />
        <BasicButton
            text="다음"
            onClick={handleNext}
            width="5.26vw"
            height="1.93vw"
            disabled={disableNext}
          />
        </div>
      </footer>

      {/* ===== 상태 안내 모달 ===== */}
      {statusModalOpen && pendingStatus && (
        <div
          className={styles.modalOverlay}
          onClick={() => { setStatusModalOpen(false); setPendingStatus(null); }}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>{STATUS_MODAL[pendingStatus].title}</div>
            <div className={styles.modalBody}>
              {STATUS_MODAL[pendingStatus].lines.map((t, i) => (
                <div key={i} className={styles.modalLine}>• {t}</div>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.modalSelect} onClick={confirmStatus}>선택하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsiderForm;
