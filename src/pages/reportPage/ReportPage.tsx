import React from "react";
import { motion } from "framer-motion";
import s from "../styles/ReportPage.module.scss";
import b from "./components/Report.module.scss";
import data from "../../data/reportDummy.json";
import IconButton from "../../components/IconButton";
import DOWNLOAD from "../../assets/images/icon/download-icon.svg";
import MAIL from "../../assets/images/icon/mail-icon.svg";
import PLUS from "../../assets/images/icon/plus-icon.svg";
import LOGO from "../../assets/images/report-logo.svg";
import QR from "../../assets/images/qr-code.png";
import CHAR from "../../assets/images/character-2d.png";
import ANGLE from "../../assets/images/protractor.png";
import SCORE from "../../assets/images/icon/report-score.svg";
import ReportOutBox from "./components/ReportOutBox";
import ReportInBox from "./components/ReportInBox";
import RecommendPlan from "./components/RecommendPlan";
import RecommendPlanLabel from "./components/RecommendPlanLabel";
import { planLabels } from "../../data/PlanLabelData";
import NewsItem from "./components/NewsItem";
import MarkDownBox from "./components/MarkDownBox";
import BusinessItem from "./components/BusinessItem";
import { CountingScore } from "./components/CountingScore";
import { getAngleMessage } from "../../utils/getScoreMsg";
import ProtractorStroker from "./components/ProtractorStroker";

const ReportPage = () => {
  const news = data?.data?.newsList ?? []; // 뉴스기사 목록

  return (
    <div className={s.reportPageWrapper}>
      <div className={s.reportContainer}>
        <section>
          {/* 상단 제목 부분 + 아이콘 2개 */}
          <div className={s.titleContainer}>
            <p className={s.title}>창업할각 로드맵</p>
            <div
              style={{ display: "flex", gap: "0.63vw", alignItems: "flex-end" }}
            >
              <IconButton
                imgSrc={DOWNLOAD}
                text="PDF"
                onClick={() => window.print()}
              />
              <IconButton imgSrc={MAIL} text="Mail" />
            </div>
          </div>
          <div className={s.dateBox}>
            <p className={s.date}>{`생성일자 | ${data.data.createdAt}`}</p>
            <p className={s.mailText}>
              * 메일 알림을 설정하지 않을 시, 로드맵을 다시 조회할 수 없습니다.
            </p>
          </div>
        </section>

        <section className={s.reportContent}>
          {/* 창업할각(각도기, 캐릭터, QR코드) */}
          <ReportOutBox>
            <div className={s.angleWrap}>
              <p className={s.subTitle}>창업할 각</p>
              <img src={ANGLE} alt="protractor" className={s.angleImg} />
              <ProtractorStroker
                angle={data.data.angle}
                className={s.arcOverlay}
              />
              <div className={s.scoreContainer}>
                <img src={SCORE} alt="protractor" style={{ width: "1.56vw" }} />
                <CountingScore target={data.data.angle} />
              </div>
            </div>
            {/* 캐릭터 + 말풍선 */}
            <div className={s.commentBox}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <ReportInBox width="17vw" height="3.33vw">
                  <p style={{ fontSize: "0.83vw", fontWeight: "600" }}>
                    {getAngleMessage(data.data.angle)}
                  </p>
                </ReportInBox>
              </motion.div>
              <img src={CHAR} alt="character-2d" style={{ width: "11vw" }} />
            </div>
            {/* QR코드 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <ReportInBox>
                <img
                  src={LOGO}
                  alt="report-logo"
                  style={{ width: "14.48vw" }}
                />
                <div style={{ width: "1.25vw" }} />
                <img src={QR} alt="qr-code" style={{ width: "4.95vw" }} />
              </ReportInBox>
            </motion.div>
          </ReportOutBox>

          <div className={s.middleSection}>
            {/* 추천 리서치 방법 */}
            <ReportOutBox width="14.22vw" height="22.60vw" className={b.column}>
              <div className={s.researchBox}>
                <p className={s.subTitle}>추천 리서치 방법</p>
                <ReportInBox width="12.14vw" height="18.02vw">
                  <MarkDownBox research={data.data.researchMethod} />
                </ReportInBox>
              </div>
            </ReportOutBox>

            <div className={s.rightSection}>
              {/* 적합한 청년창업지원사업 2개 */}
              <ReportOutBox
                width="48.80vw"
                height="13.58vw"
                className={b.column}
              >
                <div className={s.businessBox}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className={s.subTitle}>적합한 청년창업지원사업</p>
                    <img
                      src={PLUS}
                      alt="plus-icon"
                      style={{ width: "1.56vw" }}
                    />
                  </div>

                  <BusinessItem business={data.data.recommendations[0]} />
                  <BusinessItem business={data.data.recommendations[1]} />
                </div>
              </ReportOutBox>

              {/* 관련 뉴스 2개 */}
              <ReportOutBox width="48.80vw" height="8.39vw">
                <div className={s.newsContainer}>
                  <p className={s.subTitle}>관련 지역 & 산업 뉴스 및 트랜드</p>
                  <div className={s.newsRow}>
                    {news.slice(0, 2).map((item, idx, arr) => (
                      <React.Fragment key={item.link ?? idx}>
                        <NewsItem
                          title={item.title ?? ""}
                          url={item.link ?? ""}
                        />
                        {idx < arr.length - 1 && (
                          <div className={s.newsDivider} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </ReportOutBox>
            </div>
          </div>

          {/* swot 강점, 약점, 기회, 위협 */}
          <div className={s.swotBox}>
            <div className={`${s.swot} ${s.s}`}>
              <p>{data.data.strength}</p>
            </div>
            <div className={`${s.swot} ${s.w}`}>
              <p>{data.data.weakness}</p>
            </div>
            <div className={`${s.swot} ${s.o}`}>
              <p>{data.data.opportunity}</p>
            </div>
            <div className={`${s.swot} ${s.t}`}>
              <p>{data.data.threat}</p>
            </div>
          </div>

          {/* 추천 창업 계획 다이어그램 */}
          <ReportOutBox height="43.59vw" className={b.column}>
            <div className={s.recommendBox}>
              <p className={s.subTitle}>추천 창업 계획</p>

              {/* 라벨 4개 */}
              <div className={s.planLabel}>
                {planLabels.map((item) => (
                  <RecommendPlanLabel key={item.title} width={item.width}>
                    <p>
                      <span>{item.title}</span>ㅣ{item.desc}
                    </p>
                  </RecommendPlanLabel>
                ))}
              </div>
              {/* 다이어그램 */}
              <RecommendPlan
                createdAt={data.data.createdAt}
                steps={data.data.steps}
              />
            </div>
          </ReportOutBox>
        </section>

        <p className={s.warningText}>
          ※ 본 결과는 AI 분석을 기반으로 제공되었으며, 실제 상황과 차이가 있을
          수 있습니다. 참고 자료로 만 활용하시기 바랍니다.
        </p>
      </div>
    </div>
  );
};

export default ReportPage;
