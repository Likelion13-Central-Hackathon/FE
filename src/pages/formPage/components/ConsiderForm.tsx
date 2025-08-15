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

const FIELD_OPTIONS: FieldOpt[] = [
  { id: "A-1", group: "A", title: "농업, 임업 및 어업", subtitle: "작물 재배업", order: 1 },
  { id: "A-2", group: "A", title: "농업, 임업 및 어업", subtitle: "축산업", order: 2 },
  { id: "A-3", group: "A", title: "농업, 임업 및 어업", subtitle: "임업", order: 3 },
  { id: "A-4", group: "A", title: "농업, 임업 및 어업", subtitle: "어업", order: 4 },
  { id: "B-5", group: "B", title: "광업", subtitle: "석탄, 원유 및 천연가스 광업", order: 5 },
  { id: "B-6", group: "B", title: "광업", subtitle: "금속 광업", order: 6 },
  { id: "B-7", group: "B", title: "광업", subtitle: "비금속 광물 광업", order: 7 },
  { id: "B-8", group: "B", title: "광업", subtitle: "기타 광업", order: 8 },
  { id: "C-10", group: "C", title: "제조업", subtitle: "식료품 제조업", order: 10 },
  { id: "C-11", group: "C", title: "제조업", subtitle: "음료 제조업", order: 11 },
  { id: "C-12", group: "C", title: "제조업", subtitle: "담배 제조업", order: 12 },
  { id: "C-13", group: "C", title: "제조업", subtitle: "섬유제품 제조업(의복 제외)", order: 13 },
  { id: "C-14", group: "C", title: "제조업", subtitle: "의복, 의복 액세서리 및 모피제품 제조업", order: 14 },
  { id: "C-15", group: "C", title: "제조업", subtitle: "가죽, 가방 및 유사제품 제조업", order: 15 },
  { id: "C-16", group: "C", title: "제조업", subtitle: "목재 및 나무제품 제조업(가구 제외)", order: 16 },
  { id: "C-17", group: "C", title: "제조업", subtitle: "펄프, 종이 및 종이제품 제조업", order: 17 },
  { id: "C-18", group: "C", title: "제조업", subtitle: "인쇄 및 기록매체 복제업", order: 18 },
  { id: "C-19", group: "C", title: "제조업", subtitle: "코크스, 연탄 및 석유정제품 제조업", order: 19 },
  { id: "C-20", group: "C", title: "제조업", subtitle: "화학물질 및 화학제품 제조업", order: 20 },
  { id: "C-21", group: "C", title: "제조업", subtitle: "의약품 제조업", order: 21 },
  { id: "C-22", group: "C", title: "제조업", subtitle: "고무제품 및 플라스틱제품 제조업", order: 22 },
  { id: "C-23", group: "C", title: "제조업", subtitle: "비금속 광물제품 제조업", order: 23 },
  { id: "C-24", group: "C", title: "제조업", subtitle: "1차 금속 제조업", order: 24 },
  { id: "C-25", group: "C", title: "제조업", subtitle: "금속가공제품 제조업(기계 및 가구 제외)", order: 25 },
  { id: "C-26", group: "C", title: "제조업", subtitle: "전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업", order: 26 },
  { id: "C-27", group: "C", title: "제조업", subtitle: "의료, 정밀, 광학기기 및 시계 제조업", order: 27 },
  { id: "C-28", group: "C", title: "제조업", subtitle: "전기장비 제조업", order: 28 },
  { id: "C-29", group: "C", title: "제조업", subtitle: "기타 기계 및 장비 제조업", order: 29 },
  { id: "C-30", group: "C", title: "제조업", subtitle: "자동차 및 트레일러 제조업", order: 30 },
  { id: "C-31", group: "C", title: "제조업", subtitle: "기타 운송장비 제조업", order: 31 },
  { id: "C-32", group: "C", title: "제조업", subtitle: "가구 제조업", order: 32 },
  { id: "C-33", group: "C", title: "제조업", subtitle: "기타 제품 제조업", order: 33 },
  { id: "C-34", group: "C", title: "제조업", subtitle: "산업용 기계 및 장비 수리업", order: 34 },
  { id: "D-35", group: "D", title: "전기,가스,증기 및 공기조절 공급업", subtitle: "전기, 가스, 증기 및 공기조절 공급업", order: 35 },
  { id: "E-36", group: "E", title: "수도,하수 및 폐기물 처리·원료 재생업", subtitle: "수도업", order: 36 },
  { id: "E-37", group: "E", title: "수도,하수 및 폐기물 처리·원료 재생업", subtitle: "하수 및 폐수 처리업", order: 37 },
  { id: "E-38", group: "E", title: "수도,하수 및 폐기물 처리·원료 재생업", subtitle: "폐기물 수집, 운반, 처리 및 원료 재생업", order: 38 },
  { id: "E-39", group: "E", title: "수도,하수 및 폐기물 처리·원료 재생업", subtitle: "환경복원업", order: 39 },
  { id: "F-41", group: "F", title: "건설업", subtitle: "종합 건설업", order: 41 },
  { id: "F-42", group: "F", title: "건설업", subtitle: "토목 건설업", order: 42 },
  { id: "F-43", group: "F", title: "건설업", subtitle: "전문직별 공사업", order: 43 },
  { id: "G-45", group: "G", title: "도매 및 소매업", subtitle: "자동차 및 자동차 부품 판매업", order: 45 },
  { id: "G-46", group: "G", title: "도매 및 소매업", subtitle: "도매업", order: 46 },
  { id: "G-47", group: "G", title: "도매 및 소매업", subtitle: "소매업", order: 47 },
  { id: "H-49", group: "H", title: "운수 및 창고업", subtitle: "육상 운송업", order: 49 },
  { id: "H-50", group: "H", title: "운수 및 창고업", subtitle: "수상 운송업", order: 50 },
  { id: "H-51", group: "H", title: "운수 및 창고업", subtitle: "항공 운송업", order: 51 },
  { id: "H-52", group: "H", title: "운수 및 창고업", subtitle: "창고 및 운송관련 서비스업", order: 52 },
  { id: "I-55", group: "I", title: "숙박 및 음식점업", subtitle: "숙박업", order: 55 },
  { id: "I-56", group: "I", title: "숙박 및 음식점업", subtitle: "음식점 및 주점업", order: 56 },
  { id: "J-58", group: "J", title: "정보통신업", subtitle: "출판업", order: 58 },
  { id: "J-59", group: "J", title: "정보통신업", subtitle: "영상, 오디오 기록물 제작 및 배급업", order: 59 },
  { id: "J-60", group: "J", title: "정보통신업", subtitle: "방송업", order: 60 },
  { id: "J-61", group: "J", title: "정보통신업", subtitle: "우편 및 통신업", order: 61 },
  { id: "J-62", group: "J", title: "정보통신업", subtitle: "컴퓨터 프로그래밍, 시스템 통합 및 관리업", order: 62 },
  { id: "J-63", group: "J", title: "정보통신업", subtitle: "정보서비스업", order: 63 },
  { id: "K-64", group: "K", title: "금융 및 보험업", subtitle: "금융업", order: 64 },
  { id: "K-65", group: "K", title: "금융 및 보험업", subtitle: "보험 및 연금업", order: 65 },
  { id: "K-66", group: "K", title: "금융 및 보험업", subtitle: "기타 금융업", order: 66 },
  { id: "L-68", group: "L", title: "부동산업", subtitle: "부동산업", order: 68 },
  { id: "M-69", group: "M", title: "전문, 과학 및 기술 서비스업", subtitle: "전문 서비스업", order: 69 },
  { id: "M-70", group: "M", title: "전문, 과학 및 기술 서비스업", subtitle: "과학기술 서비스업", order: 70 },
  { id: "M-71", group: "M", title: "전문, 과학 및 기술 서비스업", subtitle: "건축 및 엔지니어링 서비스업", order: 71 },
  { id: "M-72", group: "M", title: "전문, 과학 및 기술 서비스업", subtitle: "연구개발업", order: 72 },
  { id: "N-73", group: "N", title: "사업시설 관리, 사업 지원 및 임대 서비스업", subtitle: "광고업", order: 73 },
  { id: "N-74", group: "N", title: "사업시설 관리, 사업 지원 및 임대 서비스업", subtitle: "사업 지원 서비스업", order: 74 },
  { id: "O-75", group: "O", title: "공공 행정, 국방 및 사회보장 행정", subtitle: "공공 행정, 국방 및 사회보장 행정", order: 75 },
  { id: "P-80", group: "P", title: "교육 서비스업", subtitle: "교육 서비스업", order: 80 },
  { id: "Q-86", group: "Q", title: "보건업 및 사회복지 서비스업", subtitle: "보건업", order: 86 },
  { id: "Q-87", group: "Q", title: "보건업 및 사회복지 서비스업", subtitle: "사회복지 서비스업", order: 87 },
  { id: "R-90", group: "R", title: "예술, 스포츠 및 여가 관련 서비스업", subtitle: "예술, 스포츠 및 여가 관련 서비스업", order: 90 },
  { id: "S-94", group: "S", title: "협회 및 단체, 수리 및 기타 개인 서비스업", subtitle: "협회 및 단체", order: 94 },
  { id: "S-95", group: "S", title: "협회 및 단체, 수리 및 기타 개인 서비스업", subtitle: "개인 및 가정용품 수리업", order: 95 },
  { id: "S-96", group: "S", title: "협회 및 단체, 수리 및 기타 개인 서비스업", subtitle: "기타 개인 서비스업", order: 96 },
  { id: "T-97", group: "T", title: "가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동", subtitle: "가구 내 고용활동", order: 97 },
  { id: "T-98", group: "T", title: "가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동", subtitle: "자가 소비 생산활동", order: 98 },
  { id: "U-99", group: "U", title: "국제 및 외국기관", subtitle: "국제 및 외국기관", order: 99 }
];



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
                  const idx = grouped.slice(0, gi).reduce((acc, [, a]) => acc + a.length, 0) + idxInGroup;
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
            {flatList.length === 0 && <div className={styles.fieldEmpty}>검색 결과가 없습니다.</div>}
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
    title: "기획 & 검증 단계 (Pre-BM)",
    lines: ["시장조사, 경쟁사 분석, 고객 인터뷰.", "비즈니스 모델(BM) 구체화.", "간단한 MVP 또는 프로토타입 제작.","피드백 및 수정 반복"],
  },
  "준비단계 >": {
    title: "준비 단계 (Pre-startup)",
    lines: ["시장조사, 경쟁사 분석, 고객 인터뷰.", "비즈니스 모델(BM) 구체화.", "간단한 MVP 또는 프로토타입 제작.","피드백 및 수정 반복"],
  },
  "아이디어 단계 >": {
    title: "아이디어 단계",
    lines: ["창업 아이템 발굴 또는 브레인 스토밍", "시장 문제나 고객 니즈 정의.", "창업동아리, 커뮤니티 등 참여."],
  },
  "실행단계 >": {
    title: "실행 단계 (사업화)",
    lines: ["사업자 등록 또는 법인설립.", "제품/서비스 정식 출시.", "마케팅 및 고객 확보." , "매출 발생 시도, 초기 운영." , "후속 투자, 파트너십, 유통망 구축 등."],
  },
  "성장단계 >": {
    title: "성장 단계 (초기 운영 이후)",
    lines: ["제품 개선/확장.", "브랜드 구축.", "후속 투자 유치, 스케일업.", "채용, 조직화 등 내부 시스템 구축."],
  },
};

const ConsiderForm: React.FC<{
  data: FormData;
  updateForm: UpdateForm;
  onPrev: () => void;
  onNext: () => void;
}> = ({ data, updateForm, onPrev, onNext }) => {
  // ✅ 로컬 상태는 UI용(모달)만 사용
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
