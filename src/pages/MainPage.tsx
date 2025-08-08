import React from "react";
import s from "./styles/MainPage.module.scss";
import TitleContainer from "../components/TitleContainer";
import TITLE from "../assets/images/first-logo.svg";
import FloatingMotion from "../components/FloatingMotion";
import BasicButton from "../components/BasicButton";

const MainPage = () => {
  return (
    <div className={s.mainPageWrapper}>
      <div className={s.titleContainer}>
        <TitleContainer
          imgSrc={TITLE}
          text={`청년의 시작, 확신으로 바꾸다.\n청년창업의 실질적인 어려움을 함께 해결합니다.`}
        />
        <div className={s.buttonContainer}>
          <BasicButton text="분석할각?" />
          <BasicButton text="선정될각?" />
        </div>
      </div>
      <FloatingMotion />
    </div>
  );
};

export default MainPage;
