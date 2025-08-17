import React, { useEffect, useRef, useState, useMemo } from "react";
import s from "../styles/DocumentPage.module.scss";
import DocumentItem from "./components/DocumentItem";
import { revisingTitles } from "../../data/revisingTitleData";
import RightOrbit from "../../components/RightOrbit";
import { BASE_LABELS, BASE_POSITION } from "../../data/documentData";

// Label 목록 인덱스 회전 함수
function rotateToCenter5<T>(
  arr: readonly [T, T, T, T, T],
  idx: number
): [T, T, T, T, T] {
  const n = 5,
    M = 2;
  const start = (((idx - M) % n) + n) % n;
  return [
    arr[start],
    arr[(start + 1) % n],
    arr[(start + 2) % n],
    arr[(start + 3) % n],
    arr[(start + 4) % n],
  ];
}

const DocumentPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 라벨을 중앙(2)으로 오도록
  const labelsForOrbit = useMemo(
    () => rotateToCenter5(BASE_LABELS, activeSection),
    [activeSection]
  );

  // 인덱스를 받아 ref 콜백 만들기
  const setSectionRef = (idx: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[idx] = el;
  };

  // 스크롤 감지
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        let bestIdx = activeSection;
        let bestRatio = 0;
        for (const entry of entries) {
          const idxStr = (entry.target as HTMLElement).dataset.index;
          if (!idxStr) continue;
          const num = Number(idxStr);
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = num;
          }
        }
        if (bestIdx !== activeSection) setActiveSection(bestIdx);
      },
      { threshold: [0.3, 0.6, 0.9] }
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [activeSection]);

  return (
    <div className={s.documentPageWrapper}>
      <div
        style={{
          width: "12.45vw",
        }}
      >
        <RightOrbit
          side="left"
          labels={labelsForOrbit}
          positions={BASE_POSITION}
          activeIndex={2}
          showLabels
        />
      </div>
      <div className={s.container}>
        {revisingTitles.map((item, index) => (
          <div
            key={index}
            className={s.section}
            data-index={index}
            ref={setSectionRef(index)}
          >
            <DocumentItem title={item.title} explanation={item.explanation} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentPage;
