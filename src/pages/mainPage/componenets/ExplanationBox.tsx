import React from "react";
import s from "../styles/ExplanationBox.module.scss";
import { ExplationBoxProps } from "../../../types/common";

// MainPage에 있는 분석할각, 선정될각 설명
const ExplanationBox: React.FC<ExplationBoxProps> = ({
  imgSrc,
  width,
  title,
  text,
}) => {
  return (
    <div className={s.explanationBoxContainer}>
      <div className={s.iconBox}>
        <img src={imgSrc} alt="icon" style={{ width: width }} />
        <p>{title}</p>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default ExplanationBox;
