import React from "react";
import s from "../pages/styles/MainPage.module.scss";
import { SizeProps } from "../types/common";
import TitleContainer from "./TitleContainer";
import FloatingMotion from "./FloatingMotion";

interface IntroProps extends SizeProps {
  title: string;
  text: string;
  children?: React.ReactNode; // 하위 컴포넌트
}

const IntroLayout: React.FC<IntroProps> = ({
  title,
  text,
  width = "27.55vw",
  height = "13.18vw",
  children,
}) => {
  return (
    <div className={s.mainPageWrapper}>
      <div className={s.titleChildren}>
        <div className={s.titleContainer}>
          <TitleContainer
            width={width}
            height={height}
            imgSrc={title}
            text={text}
          />
        </div>
        <div className={s.childrenWrapper}>{children}</div>
      </div>
      <FloatingMotion />
    </div>
  );
};

export default IntroLayout;
