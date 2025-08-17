import React from "react";
import s from "./BusinessResult.module.scss";
import b from "../../../components/styles/Box.module.scss";
import ReportOutBox from "../../../components/ReportOutBox";
import RankItem from "./RankItem";
import { ResultItemProps } from "../../../types/business";
import ReportInBox from "../../../components/ReportInBox";
import LinkButton from "../../../components/LinkButton";
import ANGLE from "../../../assets/images/result/protractor2.png";
import SCORE from "../../../assets/images/icon/report-score.svg";
import CHAR from "../../../assets/images/character-2d.png";
import ProtractorStroker from "../../../components/ProtractorStroker";
import { formatToMMDD } from "../../../utils/date";
import MarkDownBox from "../../reportPage/components/MarkDownBox";
import { formatRecruiting, linkify, normalizeUrl } from "../../../utils/format";

const ResultItem: React.FC<ResultItemProps> = ({ rankImg, item }) => {
  return (
    <div className={s.resultItemContainer}>
      <section>
        <RankItem rankImg={rankImg} item={item} />
      </section>
      <div className={s.resultItemBox}>
        <div className={s.resultContents}>
          <section className={s.resultMiddle}>
            <div>
              <ReportOutBox
                width="40.10vw"
                height="18.80vw"
                className={b.column}
              >
                <p className={s.supportArea}>지원분야 | {item.supportArea}</p>

                {/* 제목 + 링크 */}
                <ReportInBox width="37.08vw" height="4.43vw">
                  <div className={s.resultTitle}>{item.title}</div>
                  <LinkButton link={item.link} />
                </ReportInBox>

                {/* 업력, 기간, 지역, 기관, 대상, 연락처 */}
                <ReportInBox width="37.08vw" height="8.65vw">
                  <div className={s.infoBox}>
                    <div className={s.infoBoxText1}>
                      <p>창업업력 | {item.businessDuration}</p>
                      <p>
                        신청기간 | {formatToMMDD(item.startDate)}~
                        {formatToMMDD(item.endDate)}
                      </p>
                      <p>지역 | {item.region}</p>
                    </div>
                    <div className={s.infoBoxText2}>
                      <p>제한 | {item.targetAge}</p>
                      <p>상태 | {formatRecruiting(item.isRecruiting)}</p>
                      <p>연락처 | {item.contact}</p>
                    </div>
                  </div>
                </ReportInBox>
              </ReportOutBox>
            </div>
            <div>
              {/* 매칭률 */}
              <ReportOutBox width="40.10vw" height="13.07vw">
                <div className={s.angleWrap}>
                  <p className={s.angleTitle}>지원사업 매칭 보고서</p>
                  <img src={ANGLE} alt="protractor" className={s.angleImg} />
                  <ProtractorStroker
                    angle={item.suitability}
                    className={s.arcOverlay}
                    radius={138}
                  />
                  <div className={s.scoreContainer}>
                    <img
                      src={SCORE}
                      alt="report-score"
                      style={{ width: "1.56vw" }}
                    />
                    <span>{item.suitability}%</span>
                  </div>
                </div>
                {/* 매칭 이유 */}
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <img
                    src={CHAR}
                    alt="char-2d"
                    style={{
                      height: "6.25vw",
                      marginRight: "-2.0vw",
                      zIndex: 2,
                    }}
                  />
                  <ReportInBox width="15.36vw" height="10.73vw">
                    <MarkDownBox research={item.reason} />
                  </ReportInBox>
                </div>
              </ReportOutBox>
            </div>
          </section>
          <section>
            {/* 신청방법 + 지원내용 + 제출서류 + 절차및평가 */}
            <ReportOutBox width="31.30vw" height="32.97vw" className={b.column}>
              <div className={s.resultTitle}>핵심 본문 내용</div>
              <ReportInBox width="29.22vw" height="27.19vw">
                <div className={s.coreContent}>
                  <div>
                    <span className={s.target}>대상: {item.target}</span>
                  </div>
                  <div>
                    <span>주관 기관</span>
                    <p>{item.agency}</p>
                  </div>
                  <div>
                    <span>지원 내용</span>
                    <p>{item.supportDetails}</p>
                  </div>
                  <div>
                    <span>신청 방법</span>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {item.applyMethod.split("|").map((line, idx) => (
                        <p
                          key={idx}
                          dangerouslySetInnerHTML={{
                            __html: linkify(line.trim()),
                          }}
                        />
                      ))}
                    </p>
                  </div>
                  <div>
                    <span>참고 URL</span>
                    <p>
                      <a
                        href={normalizeUrl(item.guidanceUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.guidanceUrl}
                      </a>
                    </p>
                  </div>
                </div>
              </ReportInBox>
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
