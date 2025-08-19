import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import s from "../styles/DocumentPage.module.scss";
import DocumentItem, { ItemHandle } from "./components/DocumentItem";
import { revisingTitles } from "../../data/revisingTitleData";
import RightOrbit from "../../components/RightOrbit";
import { BASE_LABELS, BASE_POSITION } from "../../data/documentData";
import { pdf } from "@react-pdf/renderer";
import MyDocumentAll from "../../components/MyDocumentAll";

function rotateToCenter5<T>(arr: readonly [T, T, T, T, T], idx: number): [T, T, T, T, T] {
  const n = 5, M = 2;
  const start = (((idx - M) % n) + n) % n;
  return [arr[start], arr[(start + 1) % n], arr[(start + 2) % n], arr[(start + 3) % n], arr[(start + 4) % n]];
}

const DocumentPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const itemHandlesRef = useRef<(ItemHandle | null)[]>([]);


  if (itemHandlesRef.current.length !== revisingTitles.length) {
    itemHandlesRef.current = Array(revisingTitles.length).fill(null);
  }
  if (sectionRefs.current.length !== revisingTitles.length) {
    sectionRefs.current = Array(revisingTitles.length).fill(null);
  }


  const setItemHandle = useCallback(
    (idx: number) => (inst: ItemHandle | null) => {
      itemHandlesRef.current[idx] = inst;
    },
    []
  );

  const labelsForOrbit = useMemo(
    () => rotateToCenter5(BASE_LABELS, activeSection),
    [activeSection]
  );

  const setSectionRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionRefs.current[idx] = el;
    },
    []
  );

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


  const handleExportAll = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const items = itemHandlesRef.current.map((handle, idx) => {
        const snap = handle?.getSnapshot?.();
        return snap ?? { title: revisingTitles[idx].title, userAnswer: "", aiAnswer: "", qa: [] };
      });

      const instance = pdf(<MyDocumentAll items={items} />);
      const blob = await instance.toBlob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "전체_지원서류.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF 생성 오류:", e);
      alert("PDF 생성 중 오류가 발생했습니다.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={s.documentPageWrapper}>
      <div style={{ width: "12.45vw" }}>
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
            <DocumentItem
              ref={setItemHandle(index)}      
              title={item.title}
              explanation={item.explanation}
              onExportAll={handleExportAll}    
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentPage;
