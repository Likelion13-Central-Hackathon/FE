import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./InfoForm.module.scss";
import BasicButton from "../../../components/BasicButton";
import StatusSelect from "../../../components/StatusSelect";
import { AcademicStatus, StepComponentProps } from "../../../types/form";
import {
  ACADEMIC_STATUS_OPTIONS,
  REGION_OPTIONS,
  SIGUNGU_MAP,
} from "../../../data/formData";

const InfoForm: React.FC<StepComponentProps> = ({
  data,
  updateForm,
  onNext,
}) => {
  const handleClickYes = () => {
    // 재학
    updateForm({
      isEnrolled: true,
      university: data.university ?? "",
    });
  };

  const handleClickNo = () => {
    // 비재학: 대학/학적 null
    updateForm({
      isEnrolled: false,
      university: null,
      academicStatus: null,
    });
  };

  // 필수값 충족 여부
  const ageOk = useMemo(() => {
    const onlyNums = String(data.age ?? "").trim();
    return /^[0-9]+$/.test(onlyNums) && Number(onlyNums) > 0;
  }, [data.age]);

  const addrOk = !!data.addressCity && !!data.addressDistrict; // 주소
  const enrolledChosen = data.isEnrolled !== null; // 재학 여부
  const universityOk =
    data.isEnrolled === true ? !!data.university?.trim() : true; // 대학명
  const statusOk =
    data.isEnrolled === true ? data.academicStatus !== null : true; // 학적 상태

  // 다음 버튼 활성 조건
  const canProceed =
    ageOk && addrOk && enrolledChosen && universityOk && statusOk;
  const disableNext = !canProceed;

  const handleNext = () => {
    if (!canProceed) return;
    onNext?.();
  };

  return (
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
              <input
                className={s.age}
                type="text"
                placeholder="Ex. 25"
                value={data.age}
                onChange={(e) => {
                  // 백엔드한테 넘길때 숫자로 변환 필요
                  const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                  updateForm({ age: onlyNums });
                }}
                aria-label="나이"
                inputMode="numeric"
              />
            </div>

            <div className={s.col}>
              <div className={s.subLabel}>사업장 주소</div>
              <RegionSelect
                city={data.addressCity || ""}
                district={data.addressDistrict || ""}
                onChange={(city, district) =>
                  updateForm({ addressCity: city, addressDistrict: district })
                }
                placeholder="지역 선택하기"
                options={[...REGION_OPTIONS]}
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
              onClick={handleClickYes}
              width="7.03125vw"
              height="2.1875vw"
              active={data.isEnrolled === true}
              className={s.smallBtn}
              aria-pressed={data.isEnrolled === true}
            />
            <BasicButton
              text="아니오"
              onClick={handleClickNo}
              width="7.03125vw"
              height="2.1875vw"
              active={data.isEnrolled === false}
              className={s.smallBtn}
              aria-pressed={data.isEnrolled === false}
            />
          </div>
        </div>

        {/* Q3 — 예일 때만 노출 */}
        {data.isEnrolled === true && (
          <div className={s.q}>
            <label className={s.label}>
              어느 대학교에 다니고 계신가요? 학적상태도 알려주세요.
            </label>

            <div className={s.row}>
              <input
                className={s.unv}
                type="text"
                placeholder="학교입력"
                value={data.university ?? ""}
                onChange={(e) => updateForm({ university: e.target.value })}
                aria-label="대학교"
              />

              <StatusSelect<AcademicStatus>
                value={data.academicStatus}
                onChange={(v) => updateForm({ academicStatus: v })}
                options={ACADEMIC_STATUS_OPTIONS}
              />
            </div>
          </div>
        )}
      </div>

      {/* 하단 중앙 버튼 */}
      <div className={s.nextBtnWrapper}>
        <BasicButton
          text="다음"
          onClick={handleNext}
          width="5.26vw"
          height="1.92vw"
          disabled={disableNext}
          className={s.smallBtn}
        />
      </div>
    </>
  );
};

/* ===== 지역 선택 드롭다운 (단일 선택) ===== */
function RegionSelect({
  city,
  district,
  onChange,
  placeholder = "지역 선택하기",
  options,
}: {
  city: string;
  district: string;
  onChange: (city: string, district: string) => void;
  placeholder?: string;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 단일 선택 상태
  const [selectedSido, setSelectedSido] = useState<string | null>(null);
  const [selectedSigungu, setSelectedSigungu] = useState<string | null>(null);
  const [activeSido, setActiveSido] = useState<string | null>(null);

  useEffect(() => {
    if (city) {
      setSelectedSido(city);
      setActiveSido(city);
    } else {
      setSelectedSido(null);
      setActiveSido(null);
    }
    setSelectedSigungu(district || null);
  }, [city, district]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const label = useMemo(() => {
    if (selectedSido)
      return selectedSigungu
        ? `${selectedSido} / ${selectedSigungu}`
        : selectedSido;
    return (city && district ? `${city} / ${district}` : "") || placeholder;
  }, [selectedSido, selectedSigungu, city, district, placeholder]);

  const chooseSido = (sido: string) => {
    setSelectedSido(sido);
    setActiveSido(sido);
    setSelectedSigungu(null);
  };

  const chooseSigungu = (sgg: string) => {
    if (!selectedSido) return;
    setSelectedSigungu(sgg);
    onChange(selectedSido, sgg);
    setOpen(false);
  };

  const sigunguList = useMemo(
    () => (activeSido ? SIGUNGU_MAP[activeSido] || [] : []),
    [activeSido]
  );

  return (
    <div className={s.regionWrap} ref={ref}>
      <button
        type="button"
        className={`${s.regionTrigger} ${
          city && district ? s.regionTriggerActive : ""
        }`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={s.regionLabel}>{label}</span>
      </button>

      {open && (
        <>
          {/* 시/도 */}
          <div
            className={s.regionMenu}
            role="listbox"
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className={s.selectext}>시/도</div>
            {options.map((sido) => {
              const checked = selectedSido === sido;
              return (
                <button
                  key={sido}
                  type="button"
                  className={s.regionOption}
                  onClick={() => chooseSido(sido)}
                  aria-selected={checked}
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
                    aria-selected={checked}
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
