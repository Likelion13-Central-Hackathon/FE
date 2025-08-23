import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./styles/MainPage.module.scss";
import TITLE from "../assets/images/logo/first-logo.svg";
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
      text={`청년의 시작, 확신으로 바꾸다.\n클릭 한 번으로 알아보는 나의 창업 유형`}
      height="5.92vw"
      main={true}
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
