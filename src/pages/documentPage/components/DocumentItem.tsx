import React from "react";
import RevisingBox from "./RevisingBox";
import QuestionsBox from "./QuestionsBox";
import { RevisingTitle } from "../../../data/revisingTitleData";
import data from "../../../data/aiQuestionData.json";

const DocumentItem: React.FC<RevisingTitle> = ({ title, explanation }) => {
  return (
    <div style={{ display: "flex", gap: "1.04vw" }}>
      <RevisingBox title={title} explanation={explanation} />
      <QuestionsBox questions={data.data} />
    </div>
  );
};

export default DocumentItem;
