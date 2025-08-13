import React from "react";
import s from "./BusinessResult.module.scss";
import b from "../../../components/styles/Box.module.scss";
import ReportOutBox from "../../../components/ReportOutBox";
import RankItem from "./RankItem";
import { RankImageProps } from "../../../types/business";
import ReportInBox from "../../../components/ReportInBox";
import LinkButton from "../../../components/LinkButton";

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
              <ReportOutBox
                width="40.10vw"
                height="18.80vw"
                className={b.column}
              >
                <p className={s.supportArea}>지원분야 | OOOOO</p>

                {/* 제목 + 링크 */}
                <ReportInBox width="37.08vw" height="4.43vw">
                  <div className={s.resultTitle}>지원사업 제목</div>
                  <LinkButton link="sflkdsj" />
                </ReportInBox>

                {/* 업력, 기간, 지역, 기관, 대상, 연락처 */}
                <ReportInBox width="37.08vw" height="8.65vw">
                  <div className={s.infoBox}>
                    <div className={s.infoBoxText}>
                      <p>창업업력 |</p>
                      <p>신청기간 |</p>
                      <p>지역 |</p>
                    </div>
                    <div className={s.infoBoxText}>
                      <p>주관기관 |</p>
                      <p>대상 |</p>
                      <p>연락처 |</p>
                    </div>
                  </div>
                </ReportInBox>
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
