import React, { useState } from "react";
import s from "./styles/IntroPage.module.scss";
import { useNavigate } from "react-router-dom";
import IntroLayout from "../components/IntroLayout";
import TITLE from "../assets/images/logo/second-logo.svg";
import BasicButton from "../components/BasicButton";
import EmailPWBox from "../components/EmailPWBox";
import { reportSession } from "../utils/sessionStorage";
import getReportByEmailApi from "../api/report/getReportByEmailApi";
import LoadingSpinner from "../components/LoadingSpinner";

const FormIntroPage = () => {
  const navigate = useNavigate();

  const [showEmailPwBox, setShowEmailPwBox] = useState(false); // EmailPWBox 유무
  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호
  const [loading, setLoading] = useState(false);
  const [warningShow, setWarningShow] = useState(false);

  // 처음 “분석결과 조회” 버튼
  const handleQueryClick = async () => {
    const reportId = reportSession.read();
    // 세션스토리지에 reportId가 있으면 ReportPage로 이동
    if (reportId) {
      navigate("/report");
      return;
    }
    // 없으면 EmailPWBox 보이기
    setShowEmailPwBox(true);
  };

  // 두번째 “분석결과 조회” 버튼
  const handleEmailPwSubmit = async () => {
    if (!email || !password) {
      setWarningShow(true);
      return;
    }

    try {
      setLoading(true);
      const data = await getReportByEmailApi({ email, password });
      setWarningShow(false);

      reportSession.save(data.id); // 세션스토리지에 reportId 저장
      navigate("/report", { state: { prefetched: data } }); // ReportPage로 데이터와 함께 이동
    } catch {
      setWarningShow(true);
      console.error("FormIntroPage handleEmailPwSubmit Error");
    } finally {
      setLoading(false);
    }
  };

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
          <button className={s.underlineBtn} onClick={handleQueryClick}>
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
            warningShow={warningShow}
          />
          <button className={s.underlineBtn} onClick={handleEmailPwSubmit}>
            {loading ? <LoadingSpinner /> : "분석결과 조회"}
          </button>
        </div>
      )}
    </IntroLayout>
  );
};

export default FormIntroPage;
