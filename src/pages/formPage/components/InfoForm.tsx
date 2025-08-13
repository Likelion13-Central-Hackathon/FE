import React, { useEffect, useRef, useState } from "react";
import s from "./InfoForm.module.scss";
import styles from "./InfoForm.module.scss";
import BasicButton from "../../../components/BasicButton";
import ConsiderForm from "./ConsiderForm";
import BaseResource from "./BaseResource";

/* 새로 분리한 컴포넌트 import */
import StatusSelect from "../../../components/StatusSelect";

const STATUS_OPTIONS = ["휴학", "재학", "편입", "재입학"];
const REGION_OPTIONS = [
  "서울특별시","부산광역시","대구광역시","인천광역시","광주광역시",
  "대전광역시","울산광역시","경기도","강원특별자치도","충청북도",
  "충청남도","전라북도","전라남도","경상북도","경상남도","제주특별자치도",
];

export const InfoForm: React.FC = () => {
  const [step, setStep] = useState<"info" | "consider" | "base">("info");

  const [isCollege, setIsCollege] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  // ✅ 단일 선택
  const [region, setRegion] = useState<string>("");

  const goNext = () => setStep("consider");

  return (
    <>
      {step === "info" && (
        <>
          <div className={s.questionbox}>
            {/* Q1 */}
            <div className={s.q}>
              <label className={s.label}>
                몇 살이에요? 어디에서 사업을 하고 계신지도 알려주세요.
              </label>
              <div className={s.row}>
                <div className={s.col}>
                  <div className={s.subLabel}>나이</div>
                  <input className={s.age} type="text" placeholder="Ex. 만 25세" />
                </div>

                <div className={s.col}>
                  <div className={s.subLabel}>사업장 주소</div>
                  <RegionSelect
                    value={region}
                    onChange={(v) => setRegion(v)}
                    placeholder="지역 선택하기"
                    options={REGION_OPTIONS}
                  />
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className={s.q}>
              <label className={s.label}>현재 대학교에 다니고 있나요?</label>
              <div className={s.btnGroup}>
                <BasicButton
                  text="예"
                  onClick={() => setIsCollege(true)}
                  width="7.03125vw"
                  height="2.1875vw"
                  active={isCollege === true}
                  className={styles.smallBtn}
                />
                <BasicButton
                  text="아니오"
                  onClick={() => setIsCollege(false)}
                  width="7.03125vw"
                  height="2.1875vw"
                  active={isCollege === false}
                  className={styles.smallBtn}
                />
              </div>
            </div>

            {/* Q3 — 예일 때만 노출 */}
            {isCollege === true && (
              <div className={s.q}>
                <label className={s.label}>
                  어느 대학교에 다니고 계신가요? 학적상태도 알려주세요.
                </label>
                <div className={s.caption}>예를 선택했을 시에만 표기.</div>

                <div className={s.row}>
                  <input className={s.unv} type="text" placeholder="학교입력" />

                  {/* ✅ 분리한 StatusSelect 사용 */}
                  <StatusSelect
                    value={status}
                    onChange={(v) => setStatus(v)}
                    options={STATUS_OPTIONS}
                    classes={{
                      wrap: s.selectWrap,
                      trigger: s.selectTrigger,
                      triggerActive: s.selectTriggerActive,
                      caret: s.caret,
                      menu: s.selectMenu,
                      menuWrapper: s.selectMenuWrapper,
                      optRow: s.optRow,
                      optText: s.optText,
                      box: s.box,
                      boxOn: s.boxOn,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 하단 중앙 버튼 */}
          <div className={s.nextBtnWrapper}>
            <BasicButton
              text="다음"
              onClick={goNext}
              width="5.26vw"
              height="1.92vw"
              className={styles.smallBtn}
            />
          </div>
        </>
      )}

      {step === "consider" && (
        <ConsiderForm onPrev={() => setStep("info")} onNext={() => setStep("base")} />
      )}

      {step === "base" && <BaseResource onPrev={() => setStep("consider")} />}
    </>
  );
};

/* ===== 지역 선택 드롭다운 (단일 선택) ===== */
function RegionSelect({
  value,
  onChange,
  placeholder = "지역 선택하기",
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 단일 선택 상태
  const [selectedSido, setSelectedSido] = useState<string | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const [activeSido, setActiveSido] = useState<string | null>(null);

  const SIGUNGU_MAP: Record<string, string[]> = {
    "서울특별시": ["종로구","중구","용산구","성동구","광진구","동대문구","중랑구","성북구","강북구","도봉구",
      "노원구","은평구","서대문구","마포구","양천구","강서구","구로구","금천구","영등포구","동작구",
      "관악구","서초구","강남구","송파구","강동구"],
    "인천광역시": ["중구","동구","미추홀구","연수구","남동구","부평구","계양구","서구","강화군","옹진군"],
    "부산광역시": ["중구","서구","동구","영도구","부산진구","동래구","남구","북구","해운대구","사하구","금정구","강서구","연제구","수영구","사상구","기장군"],
    "대구광역시": ["중구","동구","서구","남구","북구","수성구","달서구","달성군","군위군"],
    "대전광역시": ["동구","중구","서구","유성구","대덕구"],
    "광주광역시": ["동구","서구","남구","북구","광산구"],
    "울산광역시": ["중구","남구","동구","북구","울주군"],
    "세종특별자치시": ["세종시 전역"],
    "경기도": ["수원시","고양시","용인시","성남시","부천시","안산시","안양시","남양주시","화성시","평택시","의정부시","시흥시","파주시","광주시","김포시","광명시","군포시","오산시","의왕시","하남시","양주시","포천시","여주시","이천시","동두천시","과천시","가평군","양평군","연천군"],
    "강원특별자치도": ["춘천시","원주시","강릉시","동해시","태백시","속초시","삼척시","홍천군","횡성군","영월군","평창군","정선군","철원군","화천군","양구군","인제군","고성군","양양군"],
    "충청북도": ["청주시","충주시","제천시","보은군","옥천군","영동군","진천군","괴산군","음성군","단양군","증평군"],
    "충청남도": ["천안시","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","부여군","서천군","청양군","홍성군","예산군","태안군"],
    "전라북도": ["전주시","군산시","익산시","정읍시","남원시","김제시","완주군","진안군","무주군","장수군","임실군","순창군","고창군","부안군"],
    "전라남도": ["목포시","여수시","순천시","나주시","광양시","담양군","곡성군","구례군","고흥군","보성군","화순군","장흥군","강진군","해남군","영암군","무안군","함평군","영광군","장성군","완도군","진도군","신안군"],
    "경상북도": ["포항시","경주시","김천시","안동시","구미시","영주시","영천시","상주시","문경시","경산시","의성군","청송군","영양군","영덕군","청도군","고령군","성주군","칠곡군","예천군","봉화군","울진군","울릉군"],
    "경상남도": ["창원시","진주시","통영시","사천시","김해시","밀양시","거제시","양산시","의령군","함안군","창녕군","고성군","남해군","하동군","산청군","함양군","거창군","합천군"],
    "제주특별자치도": ["제주시","서귀포시"],
  };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const label =
    selectedSido
      ? (selectedSigungu ? `${selectedSido} / ${selectedSigungu}` : selectedSido)
      : (value || placeholder);

  const chooseSido = (sido: string) => {
    setSelectedSido(sido);
    setActiveSido(sido);
    setSelectedSigungu(null);
  };

  const chooseSigungu = (sgg: string) => {
    if (!selectedSido) return;
    setSelectedSigungu(sgg);
    onChange(`${selectedSido} ${sgg}`);
    setOpen(false);
  };

  const sigunguList = activeSido ? (SIGUNGU_MAP[activeSido] || []) : [];

  return (
    <div className={s.regionWrap} ref={ref}>
      <button
        type="button"
        className={`${s.regionTrigger} ${value ? s.regionTriggerActive : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={s.regionLabel}>{label}</span>
      </button>

      {open && (
        <>
          {/* 시/도 */}
          <div className={s.regionMenu} role="listbox" onMouseDown={(e) => e.preventDefault()}>
            <div className={s.selectext}>시/도</div>
            {options.map((sido) => {
              const checked = selectedSido === sido;
              return (
                <button
                  key={sido}
                  type="button"
                  className={s.regionOption}
                  onClick={() => chooseSido(sido)}
                >
                  <span className={`${s.box} ${checked ? s.boxOn : ""}`} />
                  <span className={s.regionText}>{sido}</span>
                </button>
              );
            })}
          </div>

          {/* 시/군/구 */}
          {activeSido && (
            <div
              className={s.regionMenu}
              role="listbox"
              onMouseDown={(e) => e.preventDefault()}
              style={{ left: "calc(100% + 10vw)" }}
            >
              <div className={s.selectext}>시/군/구</div>
              {sigunguList.map((sgg) => {
                const checked = selectedSigungu === sgg;
                return (
                  <button
                    key={sgg}
                    type="button"
                    className={s.regionOption}
                    onClick={() => chooseSigungu(sgg)}
                  >
                    <span className={`${s.box} ${checked ? s.boxOn : ""}`} />
                    <span className={s.regionText}>{sgg}</span>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default InfoForm;
