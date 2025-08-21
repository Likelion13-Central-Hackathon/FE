import React, { useState, forwardRef, useImperativeHandle } from "react";
import s from "./Document.module.scss";
import b from "../../../components/styles/Box.module.scss";
import ReportOutBox from "../../../components/ReportOutBox";
import ReportInBox from "../../../components/ReportInBox";
import BasicButton from "../../../components/BasicButton";
import RETURN from "../../../assets/images/return-button.png";
import GradientBox from "../../../components/GradientBox";
import type { RevisingBoxHandle, RevisingTitle } from "../../../types/document";
import { aiAnswerSession$ } from "../../../utils/sessionStorage";
import createAiAnswer from "../../../api/document/createAiResponseApi";


const RevisingBox = forwardRef<RevisingBoxHandle, RevisingTitle & { questionNumber: number }>(
  ({ title, explanation, questionNumber }, ref) => {
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [aiAnswer, setAiAnswer] = useState<string>("");
    const [rotating, setRotating] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
  

    const isDisabled = userAnswer.trim().length === 0;

    useImperativeHandle(ref, () => ({
      getUserAnswer: () => userAnswer,
      getAiAnswer: () => aiAnswer,
      getAnswerId:() => aiAnswerSession$(questionNumber).read()
    }));

    const handleCopy = () => {
      navigator.clipboard.writeText(aiAnswer).catch(console.error);
    };

    const handleRevising = async () => {
      if (isDisabled || loading) return;
      setRotating(true);
      setLoading(true);
      try {
        const { aiAnswer, answerId } = await createAiAnswer({
          questionNumber,
          userAnswer: userAnswer.trim(),
        });
        setAiAnswer(aiAnswer);
        aiAnswerSession$(questionNumber).save(answerId);
      } catch (e: unknown) {
        console.error(e);
        const msg = e instanceof Error ? e.message : String(e);
        alert(msg || "AI 첨삭 생성에 실패했습니다.");
      } finally {
        setRotating(false);
        setLoading(false);
      }
    };

    return (
      <GradientBox>
        <div>
          <div className={s.titleBox}>
            <div className={s.titleAndDownload}>
              <p>지원서류 길잡이</p>
            </div>
            <p>초기차업패키지 / 예비창업패키지 / 창업도약패키지 사업계획서 길잡이.</p>
          </div>

          <ReportOutBox width="61.56vw" height="35.47vw">
            <div style={{ display: "flex", flexDirection: "column", gap: "2.60vw" }}>
              <section className={s.itemInfo}>
                <span>{title}</span>
                <p>{explanation}</p>
              </section>

              <section style={{ display: "flex", gap: "1.35vw" }}>
                {/* 사용자 답변 입력 */}
                <ReportOutBox width="24.32vw" height="22.92vw" className={b.column}>
                  <p className={s.guideText}>답변 입력하기</p>
                  <ReportInBox width="22.24vw" height="18.02vw">
                    <textarea
                      placeholder="답변을 입력하세요."
                      className={s.textarea}
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                    />
                  </ReportInBox>
                </ReportOutBox>

                {/* 첨삭받기 버튼 */}
                <div className={s.returnButton}>
                  <img
                    src={RETURN}
                    alt="return-button"
                    style={{ width: "3.75vw" }}
                    className={rotating ? s.rotate : ""}
                  />
                  <BasicButton
                    width="5.31vw"
                    height="1.67vw"
                    text="첨삭받기"
                    onClick={handleRevising}
                    disabled={isDisabled || loading}
                    aria-disabled={isDisabled || loading}
                  />
                </div>

                {/* AI 첨삭 답변 + 복사 버튼 */}
                <ReportOutBox width="24.32vw" height="22.92vw" className={b.column}>
                  <div className={s.aiTitle}>
                    <p className={s.guideText}>AI 첨삭 답변</p>
                    <BasicButton
                      width="4.27vw"
                      height="1.67vw"
                      text="복사"
                      onClick={handleCopy}
                    />
                  </div>
                  <ReportInBox width="22.24vw" height="18.02vw">
                    <div className={s.aiResponse}>{aiAnswer}</div>
                  </ReportInBox>
                </ReportOutBox>
              </section>
            </div>
          </ReportOutBox>
        </div>
      </GradientBox>
    );
  }
);

export default RevisingBox;
