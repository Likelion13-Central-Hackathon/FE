import React, { useEffect } from "react";
import s from "./Document.module.scss";
import IconButton from "../../../components/IconButton";
import PDF from "../../../assets/images/icon/download-icon.svg";
import RevisingBox from "./RevisingBox";
import QuestionsBox from "./QuestionsBox";
import type { DocumentItemProps } from "../../../types/document";
import { useDocStore } from "../../../store/documentStore";

type Props = DocumentItemProps & {
  onRequireWarn?: () => void;
  questionNumber: number;
};

const DocumentItem = ({
  title,
  explanation,
  onExportAll,
  onRequireWarn,
  questionNumber,
}: Props) => {
  const initItem = useDocStore((s) => s.initItem);

  useEffect(() => {
    initItem(questionNumber, title);
  }, [questionNumber, title, initItem]);

  return (
    <div className={s.documentItemContainer}>
      <div className={s.pdfButton}>
        <IconButton imgSrc={PDF} text="PDF" onClick={onExportAll} />
      </div>
      <RevisingBox
        title={title}
        explanation={explanation}
        questionNumber={questionNumber}
      />

      <QuestionsBox
        onRequireWarn={onRequireWarn}
        questionNumber={questionNumber}
      />
    </div>
  );
};

DocumentItem.displayName = "DocumentItem";

export default DocumentItem;
