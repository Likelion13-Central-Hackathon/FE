import React, { useRef, forwardRef, useImperativeHandle } from "react";
import IconButton from "../../../components/IconButton";
import PDF from "../../../assets/images/icon/download-icon.svg";
import RevisingBox from "./RevisingBox";
import QuestionsBox from "./QuestionsBox";
import data from "../../../data/aiQuestionData.json";
import type {
  ItemHandle,
  DocumentItemProps,
  RevisingBoxHandle,
  QuestionsBoxHandle,
} from "../../../types/document";

type Props = DocumentItemProps & {
  onRequireWarn?: () => void;
};

const DocumentItem = forwardRef<ItemHandle, Props>(
  ({ title, explanation, onExportAll, onRequireWarn }, ref) => {
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

         <QuestionsBox
        ref={questionsRef}
        questions={data.data}
        getAiAnswer={() => revisingRef.current?.getAiAnswer?.() ?? ""}
        onRequireWarn={onRequireWarn}
      />

      </div>
    );
  }
);

DocumentItem.displayName = "DocumentItem";

export default DocumentItem;
