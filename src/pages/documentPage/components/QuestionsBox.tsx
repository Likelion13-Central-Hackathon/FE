import React, { useState, forwardRef, useImperativeHandle } from "react";
import s from "./Document.module.scss";
import b from "../../../components/styles/Box.module.scss";
import ReportOutBox from "../../../components/ReportOutBox";
import ReportInBox from "../../../components/ReportInBox";
import type { QuestionsBoxProps, QuestionsBoxHandle } from "../../../types/document";

const QuestionsBox = forwardRef<QuestionsBoxHandle, QuestionsBoxProps>(({ questions }, ref) => {
  const [started, setStarted] = useState(false);

  useImperativeHandle(ref, () => ({
    getVisibleQA: () =>
      (started ? questions.slice(0, 4) : []).map((q) => ({
        question: q.question,
        answer: q.answer,
      })),
  }));

  const handleStart = () => setStarted(true);
  const handleRetry = () => {
    console.log("질문 다시 요청");
  };

  return (
    <div className={s.questionBox}>
      <ReportOutBox width="12.97vw" height="5.63vw">
        <p className={s.infoText1}>
          {`AI 첨삭 이후, 답변에 따른\n예상 질문도 생성해 보세요!`}
        </p>
      </ReportOutBox>

      <ReportOutBox width="12.97vw" height="33.28vw" className={b.column}>
        <p className={s.infoText2}>문항별 질의응답 예상 질문</p>

        {started && (
          <button className={s.retryButton} onClick={handleRetry}>
            다른질문 보기
          </button>
        )}

        <ReportInBox width="10.88vw" height="27.40vw">
          {!started && (
            <p className={s.makeButton} onClick={handleStart}>
              생성하기
            </p>
          )}

          {started && (
            <div className={s.qaFourBox}>
              {questions.slice(0, 4).map((q, i) => (
                <React.Fragment key={i}>
                  <div className={s.qaItem}>
                    <span>Q. {q.question}</span>
                    <p>A. {q.answer}</p>
                  </div>
                  {i < 3 && <div>...</div>}
                </React.Fragment>
              ))}
            </div>
          )}
        </ReportInBox>
      </ReportOutBox>
    </div>
  );
});

export default QuestionsBox;
