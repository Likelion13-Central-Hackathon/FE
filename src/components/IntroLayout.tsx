import React from "react";
import s from "../pages/styles/MainPage.module.scss";
import { SizeProps } from "../types/common";
import TitleContainer from "./TitleContainer";
import FloatingMotion from "./FloatingMotion";
import ANALYZE from "../assets/images/icon/analyze-icon.svg";
import SELECTED from "../assets/images/icon/selected-icon.svg";
import ExplanationBox from "../pages/mainPage/componenets/ExplanationBox";
import ScrollDown from "../pages/mainPage/componenets/ScrollDown";

interface IntroProps extends SizeProps {
  title: string;
  text: string;
  children?: React.ReactNode; // 하위 컴포넌트
  warningText?: string;
  main?: boolean;
}

const IntroLayout: React.FC<IntroProps> = ({
  title,
  text,
  width = "27.55vw",
  height = "13.18vw",
  children,
  warningText,
  main = false,
}) => {
  return (
    <div className={s.mainPageWrapper}>
      <div style={{ display: "flex" }}>
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
      </div>
      {warningText && <div className={s.warningText}>{warningText}</div>}
      {main && (
        <div className={s.explanationBoxs}>
          <ExplanationBox
            imgSrc={ANALYZE}
            width="2.45vw"
            title="분석할각?"
            text="지역의 미래는 창업에서 시작됩니다. 당신의 가능성을 분석해 드립니다."
          />
          <ScrollDown />
          <ExplanationBox
            imgSrc={SELECTED}
            width="2.45vw"
            title="선정될각?"
            text="지원사업 선정, 지역경제 활성화의 첫 걸음입니다."
          />
        </div>
      )}
    </div>
  );
};

export default IntroLayout;
