import React, { useState } from "react";
import s from "./Document.module.scss";
import b from "../../../components/styles/Box.module.scss";
import ReportOutBox from "../../../components/ReportOutBox";
import ReportInBox from "../../../components/ReportInBox";
import BasicButton from "../../../components/BasicButton";
import RETURN from "../../../assets/images/return-button.png";
import GradientBox from "../../../components/GradientBox";
import type { RevisingTitle } from "../../../types/document";
import { aiAnswerSession$ } from "../../../utils/sessionStorage";
import createAiAnswer from "../../../api/document/createAiResponseApi";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useDocStore } from "../../../store/documentStore";

type Props = RevisingTitle & { questionNumber: number };

const RevisingBox: React.FC<Props> = ({
  title,
  explanation,
  questionNumber,
}) => {
  const item = useDocStore((s) => s.items[questionNumber]);
  const update = useDocStore((s) => s.updateItem);

  const [rotating, setRotating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const userAnswer = item?.userAnswer ?? "";
  const aiAnswer = item?.aiAnswer ?? "";
  const isDisabled = userAnswer.trim().length === 0;

  // 복사
  const handleCopy = () => {
    navigator.clipboard.writeText(aiAnswer).catch(console.error);
  };

  const handleRevising = async () => {
    if (isDisabled || loading) return;
    setRotating(true);
    setLoading(true);
    try {
      const { aiAnswer: nextAi, answerId } = await createAiAnswer({
        questionNumber,
        userAnswer: userAnswer.trim(),
      });
      // zustand에 AI 답변 저장
      update(questionNumber, { aiAnswer: nextAi });
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
          <p>
            초기창업패키지 / 예비창업패키지 / 창업도약패키지 사업계획서 길잡이.
          </p>
        </div>

        <ReportOutBox width="61.56vw" height="35.47vw">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2.60vw" }}
          >
            <section className={s.itemInfo}>
              <span>{title}</span>
              <p>{explanation}</p>
            </section>

            <section style={{ display: "flex", gap: "1.35vw" }}>
              {/* 사용자 답변 입력 */}
              <ReportOutBox
                width="24.32vw"
                height="22.92vw"
                className={b.column}
              >
                <p className={s.guideText}>답변 입력하기</p>
                <ReportInBox width="22.24vw" height="18.02vw">
                  <textarea
                    placeholder="답변을 입력하세요."
                    className={s.textarea}
                    value={userAnswer}
                    onChange={(e) =>
                      update(questionNumber, { userAnswer: e.target.value })
                    }
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
              <ReportOutBox
                width="24.32vw"
                height="22.92vw"
                className={b.column}
              >
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
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <LoadingSpinner size={12} />
                    </div>
                  ) : (
                    <div className={s.aiResponse}>{aiAnswer}</div>
                  )}
                </ReportInBox>
              </ReportOutBox>
            </section>
          </div>
        </ReportOutBox>
      </div>
    </GradientBox>
  );
};

export default RevisingBox;
