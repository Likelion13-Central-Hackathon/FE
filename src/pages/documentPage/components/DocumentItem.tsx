import React from "react";
import RevisingBox from "./RevisingBox";
import QuestionsBox from "./QuestionsBox";
import { RevisingTitle } from "../../../data/RevisingTitleData";

const DocumentItem: React.FC<RevisingTitle> = ({ title, explanation }) => {
  return (
    <div style={{ display: "flex", gap: "1.04vw" }}>
      <RevisingBox title={title} explanation={explanation} />
      <QuestionsBox />
    </div>
  );
};

export default DocumentItem;
