import React from "react";
import s from "./Document.module.scss";
import b from "../../../components/styles/Box.module.scss";
import ReportOutBox from "../../../components/ReportOutBox";
import ReportInBox from "../../../components/ReportInBox";

const QuestionsBox = () => {
  return (
    <div className={s.questionBox}>
      <ReportOutBox width="12.97vw" height="5.63vw">
        <p className={s.infoText1}>
          {`AI 첨삭 이후, 답변에 따른\n예상 질문도 생성해 보세요!`}
        </p>
      </ReportOutBox>
      <ReportOutBox width="12.97vw" height="33.28vw" className={b.column}>
        <p className={s.infoText2}>문항별 질의응답 예상 질문</p>
        <ReportInBox width="10.88vw" height="27.40vw">
          질문들
        </ReportInBox>
      </ReportOutBox>
    </div>
  );
};

export default QuestionsBox;
