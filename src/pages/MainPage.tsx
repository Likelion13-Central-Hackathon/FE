import React from "react";
import TitleContainer from "../components/TitleContainer";
import TITLE from "../assets/images/first-logo.svg";

const MainPage = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <TitleContainer
        imgSrc={TITLE}
        text={`청년의 시작, 확신으로 바꾸다.\n청년창업의 실질적인 어려움을 함께 해결합니다.`}
      />
    </div>
  );
};

export default MainPage;
