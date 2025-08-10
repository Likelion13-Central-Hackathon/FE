import React from "react";
import s from "./styles/TitleContainer.module.scss";
import { SizeTextProps } from "../types/common";

interface TitleContainerProps extends SizeTextProps {
  imgSrc: string;
  motionType?: "init" | "exit" | "enter"; // 모션 타입
}

const TitleContainer: React.FC<TitleContainerProps> = ({
  imgSrc,
  text,
  width = "27.55vw",
  height = "5.92vw",
  motionType = "init",
}) => {
  return (
    <div className={s.titleContainer}>
      <img
        src={imgSrc}
        alt="TitleContainer-logo"
        className={`${s.titleImage} ${s[motionType]}`}
        style={{ width, height }}
      />
      <p className={s.titleText}>{text}</p>
    </div>
  );
};

export default TitleContainer;
