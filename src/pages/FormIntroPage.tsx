import React, { useState } from "react";
import s from "./styles/IntroPage.module.scss";
import { useNavigate } from "react-router-dom";
import IntroLayout from "../components/IntroLayout";
import TITLE from "../assets/images/second-logo.svg";
import BasicButton from "../components/BasicButton";
import EmailPWBox from "../components/EmailPwBox";

const FormIntroPage = () => {
  const [showEmailPwBox, setShowEmailPwBox] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <IntroLayout
      title={TITLE}
      text={`지역의 미래는 창업에서 시작됩니다.\n당신의 가능성을 분석해 드립니다.`}
    >
      {!showEmailPwBox ? (
        <div className={s.boxContainer1}>
          <BasicButton
            text="시작하기"
            width="16.98vw"
            height="2.5vw"
            onClick={() => navigate("/form")}
          />
          <button
            className={s.underlineBtn}
            onClick={() => setShowEmailPwBox(true)}
          >
            분석결과 조회
          </button>
        </div>
      ) : (
        <div className={s.boxContainer2}>
          <EmailPWBox
            email={email}
            password={password}
            onChangeEmail={setEmail}
            onChangePassword={setPassword}
          />
          <button
            className={s.underlineBtn}
            onClick={() => navigate("/dashboard")}
          >
            분석결과 조회
          </button>
        </div>
      )}
    </IntroLayout>
  );
};

export default FormIntroPage;
