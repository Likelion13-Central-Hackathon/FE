import React from "react";
import s from "../styles/ScrollTextBox.module.scss";
import TRIANGLE from "../../../assets/images/icon/triangle-icon.svg";
import { ScrollTextBoxProps } from "../../../types/common";

const ScrollTextBox: React.FC<ScrollTextBoxProps> = ({
  title,
  subTitle,
  text,
  direction = "left",
  alignment = "center",
  marginTop = "0",
}) => {
  // 이미지 화살표 방향
  const dirClass = direction === "right" ? s.right : "";
  // 텍스트 정렬
  const alignClass =
    alignment === "left"
      ? s.alignLeft
      : alignment === "right"
      ? s.alignRight
      : s.alignCenter;

  return (
    <div className={`${s.scrollTextBox} ${dirClass}`} style={{ marginTop }}>
      {alignment != "right" && (
        <img src={TRIANGLE} alt="triangle-icon" className={s.icon} />
      )}
      <div className={`${s.textBox} ${alignClass}`}>
        <p className={s.title}>{title}</p>
        <p className={s.subTitle}>{subTitle}</p>
        <p className={s.text}>{text}</p>
      </div>
      {alignment == "right" && (
        <img src={TRIANGLE} alt="triangle-icon" className={s.icon} />
      )}
    </div>
  );
};

export default ScrollTextBox;
