import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./InfoForm.module.scss";
import { SIGUNGU_MAP } from "../../../data/formData";

/* ===== 지역 선택 드롭다운 (단일 선택) ===== */
export default function RegionSelect({
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
