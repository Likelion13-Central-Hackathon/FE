import React from "react";
import s from "./styles/IntroPage.module.scss";
import { useNavigate } from "react-router-dom";
import IntroLayout from "../components/IntroLayout";
import BasicButton from "../components/BasicButton";
import TITLE from "../assets/images/logo/third-logo.svg";

const DocumentIntroPage = () => {
  const navigate = useNavigate();

  return (
    <IntroLayout
      title={TITLE}
      text={`지원사업 선정,\n지역 경제 활성화의 첫걸음입니다.`}
      warningText={`정밀한 분석을 위해 최대한 구체적으로 질문에 응답해 주세요.\n입력하지 않은 정보는 미응답 처리가 되어 결과값의 영향을 미칠 수 있습니다.`}
    >
      <div className={s.boxContainer1}>
        <BasicButton
          text="시작하기"
          width="16.98vw"
          height="2.5vw"
          onClick={() => navigate("/document")}
        />
      </div>
    </IntroLayout>
  );
};

export default DocumentIntroPage;
