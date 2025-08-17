import React, { useState } from "react";
import s from "./styles/IntroPage.module.scss";
import { useNavigate } from "react-router-dom";
import IntroLayout from "../components/IntroLayout";
import TITLE from "../assets/images/logo/second-logo.svg";
import BasicButton from "../components/BasicButton";
import EmailPWBox from "../components/EmailPWBox";

const FormIntroPage = () => {
  const [showEmailPwBox, setShowEmailPwBox] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <IntroLayout
      title={TITLE}
      text={`지역의 미래는 창업에서 시작됩니다.\n당신의 가능성을 분석해 드립니다.`}
      warningText={`정밀한 분석을 위해 최대한 구체적으로 질문에 응답해 주세요.\n입력하지 않은 정보는 미응답 처리가 되어 결과값의 영향을 미칠 수 있습니다.`}
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
            onClick={() => navigate("/report")}
          >
            분석결과 조회
          </button>
        </div>
      )}
    </IntroLayout>
  );
};

export default FormIntroPage;
