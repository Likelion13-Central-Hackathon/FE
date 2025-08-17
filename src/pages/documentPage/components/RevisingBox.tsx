import React, { useState } from "react";
import s from "./Document.module.scss";
import b from "../../../components/styles/Box.module.scss";
import ReportOutBox from "../../../components/ReportOutBox";
import ReportInBox from "../../../components/ReportInBox";
import BasicButton from "../../../components/BasicButton";
import RETURN from "../../../assets/images/return-button.png";
import PDF from "../../../assets/images/icon/download-icon.svg";
import IconButton from "../../../components/IconButton";
import GradientBox from "../../../components/GradientBox";
import data from "../../../data/aiRevisingData.json";
import { RevisingTitle } from "../../../data/revisingTitleData";

const RevisingBox: React.FC<RevisingTitle> = ({ title, explanation }) => {
  const [aiAnswer, setAiAnswer] = useState<string>(""); // ai 첨삭 답변
  const [rotating, setRotating] = useState<boolean>(false); // 새로고침 이미지 돌아감

  // 복사
  const handleCopy = () => {
    navigator.clipboard.writeText(aiAnswer).catch((err) => {
      console.error("복사 실패:", err);
    });
  };

  // 첨삭받기
  const handleRevising = () => {
    // 새로고침 돌아가는
    setRotating(true);
    setTimeout(() => setRotating(false), 1000);

    // 답변 보이기
    if (data.isSuccess && data.data?.aiAnswer) {
      setAiAnswer(data.data.aiAnswer);
    }
  };

  return (
    <GradientBox>
      <div>
        <div className={s.titleBox}>
          <div className={s.titleAndDownload}>
            <p>지원서류 길잡이</p>
            <IconButton imgSrc={PDF} text="PDF" />
          </div>
          <p>
            초기차업패키지 / 예비창업패키지 / 창업도약패키지 사업계획서 길잡이.
          </p>
        </div>
        <ReportOutBox width="61.56vw" height="35.47vw">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2.60vw" }}
          >
            {/* 문항 정보 */}
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
                  <div className={s.aiResponse}>{aiAnswer}</div>
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
