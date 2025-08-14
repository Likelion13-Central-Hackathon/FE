import React from "react";
import s from "../styles/DocumentPage.module.scss";
import DocumentItem from "./components/DocumentItem";
import { revisingTitles } from "../../data/RevisingTitleData";

const DocumentPage = () => {
  return (
    <div style={{ display: "flex", gap: "5.73vw" }}>
      <div style={{ width: "12.45vw", backgroundColor: "yellow" }}>
        각도기 영역
      </div>
      <div className={s.container}>
        {revisingTitles.map((item, index) => (
          <div key={index} className={s.section}>
            <DocumentItem title={item.title} explanation={item.explanation} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentPage;
