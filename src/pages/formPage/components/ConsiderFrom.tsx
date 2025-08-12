import React, { useMemo, useState } from "react";
import styles from "./ConsiderForm.module.scss";
import BasicButton from "../../components/BasicButton"; // 경로는 프로젝트 구조에 맞게 조정

// 아이콘은 네가 넣어줘. (예: import bizIcon from "../../assets/icons/biz.svg";)
type SupportItem = {
  key: string;
  label: string;
  icon?: string; // 이미지 경로 (선택)
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

const ConsiderForm: React.FC = () => {
  // 상태
  const [selectedField, setSelectedField] = useState<string | null>(null); // 분야 선택하기 버튼(모달 연결 전 임시)
  const [supportRanks, setSupportRanks] = useState<Record<string, string>>({});
  const [careers, setCareers] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [itemText, setItemText] = useState("");

  // 토글 유틸
  const toggleFromArray = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const handleRankChange = (key: string, rank: string) => {
    setSupportRanks((prev) => ({ ...prev, [key]: rank }));
  };

  // 제출 or 다음
  const onNext = () => {
    const payload = {
      field: selectedField,
      support: supportRanks,
      careers,
      statuses,
      itemText,
    };
    console.log("다음으로 넘길 값:", payload);
    // TODO: 라우팅 또는 상위에 lift
  };

  const disableNext = useMemo(() => false, []); // 필요 시 필수값 검증

  return (
    <div className={styles.container}>
      {/* 배경 이미지는 상위에서 깔거나 여기서 넣어도 됨. 필요 시 props로 */}
      <div className={styles.formBox}>
        {/* 제목/로고는 상단 고정 이미지 대신 텍스트로 처리. 필요 시 이미지 교체 */}
        <div className={styles.header}>
          <div className={styles.logoTitle}>
            {/* 로고 이미지가 있다면 여기에 <img className={styles.logo} src={logo} alt="logo" /> */}
            <span className={styles.title}>창업할까?</span>
          </div>
        </div>

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
                  {/* 아이콘 이미지 경로가 있다면 아래 img 사용 */}
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

        {/* 섹션 5: 아이템 텍스트 + 안내문 */}
        <section className={styles.section}>
          <h3 className={styles.label}>어떤 창업 아이템을 준비중인가요?</h3>
          <textarea
            className={styles.textarea}
            placeholder="ex) 지문인식을 통해 개인 또는 구체화하고자 하는 제품·서비스 개요(사용 용도, 시장, 가격 등), 핵심 기능·성능, 고객 피드백 획득 등&#10;ex) 예시 : 가계부(결제 자료를 확보해 유저의 흥미를 돋이는 자료(핵심 기능)를 사용"
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
          />
          <div className={styles.note}>
            * 입력 예시는 가이드일 뿐이며 실제 작성 형식은 자유입니다.
          </div>
        </section>

        {/* 하단 버튼 */}
        <div className={styles.footerBtns}>
          <BasicButton text="이전" onClick={() => console.log("이전")} width="7.8125vw" height="2.1875vw" />
          <BasicButton
            text="다음"
            onClick={onNext}
            width="7.8125vw"
            height="2.1875vw"
            // @ts-ignore (프로젝트 타입 정의에 따라 필요할 수 있음)
            disabled={disableNext}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsiderForm;
