import React from "react";
import s from "./BusinessResult.module.scss";
import ReportOutBox from "../../../components/ReportOutBox";
import RankItem from "./RankItem";
import { RankImageProps } from "../../../types/business";

const ResultItem: React.FC<RankImageProps> = ({ rankImg }) => {
  return (
    <div className={s.resultItemContainer}>
      <section>
        <RankItem rankImg={rankImg} />
      </section>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.56vw" }}>
        <div className={s.resultContents}>
          <section className={s.resultMiddle}>
            <div>
              <ReportOutBox width="40.10vw" height="18.80vw">
                정보
              </ReportOutBox>
            </div>
            <div>
              <ReportOutBox width="40.10vw" height="13.07vw">
                매칭
              </ReportOutBox>
            </div>
          </section>
          <section>
            <ReportOutBox width="31.30vw" height="32.97vw">
              본문
            </ReportOutBox>
          </section>
        </div>
        <p className={s.resultItemWarning}>
          * 본 결과는 AI 분석을 기반으로 제공되었으며, 실제 상황과 차이가 있을
          수 있습니다. 자세한 내용은 본문을 참고 바랍니다.
        </p>
      </div>
    </div>
  );
};

export default ResultItem;
