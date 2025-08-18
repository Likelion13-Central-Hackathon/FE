import React, { useRef, forwardRef, useImperativeHandle } from "react";
import IconButton from "../../../components/IconButton";
import PDF from "../../../assets/images/icon/download-icon.svg";
import RevisingBox, { RevisingBoxHandle } from "./RevisingBox";
import QuestionsBox, { QuestionsBoxHandle } from "./QuestionsBox";
import type { RevisingTitle } from "../../../data/revisingTitleData";

export type ItemHandle = {
  getSnapshot: () => {
    title: string;
    userAnswer: string;
    aiAnswer: string;
    qa: { question: string; answer: string }[];
  };
};

type Props = RevisingTitle & {
  onExportAll?: () => void; 
};

const DocumentItem = forwardRef<ItemHandle, Props>(
  ({ title, explanation, onExportAll }, ref) => {
    const revisingRef = useRef<RevisingBoxHandle>(null);
    const questionsRef = useRef<QuestionsBoxHandle>(null);

    
    useImperativeHandle(ref, () => ({
      getSnapshot() {
        return {
          title,
          userAnswer: revisingRef.current?.getUserAnswer?.() || "",
          aiAnswer:   revisingRef.current?.getAiAnswer?.()   || "",
          qa:         questionsRef.current?.getVisibleQA?.() || [],
        };
      },
    }));

    
    const handleClick = () => {
      if (onExportAll) onExportAll();
    };

    return (
      <div style={{ display: "flex", gap: "1.04vw", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 auto" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.52vw" }}>
            <IconButton imgSrc={PDF} text="PDF" onClick={handleClick} />
          </div>

          <RevisingBox ref={revisingRef} title={title} explanation={explanation} />
        </div>

        <QuestionsBox ref={questionsRef} questions={[]} />
      </div>
    );
  }
);

DocumentItem.displayName = "DocumentItem";

export default DocumentItem;
