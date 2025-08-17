import React from "react";
import s from "../pages/styles/MainPage.module.scss";
import { SizeProps } from "../types/common";
import TitleContainer from "./TitleContainer";
import FloatingMotion from "./FloatingMotion";

interface IntroProps extends SizeProps {
  title: string;
  text: string;
  children?: React.ReactNode; // 하위 컴포넌트
  warningText?: string;
}

const IntroLayout: React.FC<IntroProps> = ({
  title,
  text,
  width = "27.55vw",
  height = "13.18vw",
  children,
  warningText,
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
      <FloatingMotion mirrored={false} />

      {warningText && <div className={s.warningText}>{warningText}</div>}
    </div>
  );
};

export default IntroLayout;
