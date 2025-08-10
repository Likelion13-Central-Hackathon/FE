import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./styles/MainPage.module.scss";
import TITLE from "../assets/images/first-logo.svg";
import BasicButton from "../components/BasicButton";
import IntroLayout from "../components/IntroLayout";

const MainPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <IntroLayout
      title={TITLE}
      text={`청년의 시작, 확신으로 바꾸다.\n청년창업의 실질적인 어려움을 함께 해결합니다.`}
      height="5.92vw"
    >
      <div className={s.buttonContainer}>
        <BasicButton
          text="분석할각?"
          onClick={() => handleNavigate("/form-intro")}
        />
        <BasicButton
          text="선정될각?"
          onClick={() => handleNavigate("/document-intro")}
        />
      </div>
    </IntroLayout>
  );
};

export default MainPage;
