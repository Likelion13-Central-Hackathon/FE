import React from "react";
import s from "./styles/TitleContainer.module.scss";
import { SizeTextProps } from "../types/common";

interface TitleContainerProps extends SizeTextProps {
  imgSrc: string;
}

const TitleContainer: React.FC<TitleContainerProps> = ({
  imgSrc,
  text,
  width = "27.55vw",
  height = "5.92vw",
}) => {
  return (
    <div className={s.titleContainer}>
      <img
        src={imgSrc}
        alt="TitleContainer-logo"
        className={s.titleImage}
        style={{ width, height }}
      />
      <p className={s.titleText}>{text}</p>
    </div>
  );
};

export default TitleContainer;
