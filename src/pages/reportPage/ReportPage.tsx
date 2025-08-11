import React from "react";
import s from "../styles/ReportPage.module.scss";
import b from "./components/Report.module.scss";
import data from "../../data/reportDummy.json";
import IconButton from "../../components/IconButton";
import DOWNLOAD from "../../assets/images/icon/download-icon.svg";
import MAIL from "../../assets/images/icon/mail-icon.svg";
import ReportOutBox from "./components/ReportOutBox";
import ReportInBox from "./components/ReportInBox";
import RecommendPlan from "./components/RecommendPlan";
import RecommendPlanLabel from "./components/RecommendPlanLabel";
import { planLabels } from "../../data/PlanLabelData";
import NewsItem from "./components/NewsItem";
import MarkDownBox from "./components/MarkDownBox";

const ReportPage = () => {
  const news = data?.data?.newsList ?? []; // 뉴스기사 목록

  return (
    <div className={s.reportPageWrapper}>
      <div className={s.reportContainer}>
        {/* 상단 제목 부분 + 아이콘 2개 */}
        <section className={s.titleContainer}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.42vw" }}
          >
            <p className={s.title}>창업할각 로드맵</p>
            <p className={s.date}>{`생성일자 | ${data.data.createdAt}`}</p>
          </div>

          <div
            style={{ display: "flex", gap: "0.63vw", alignItems: "flex-end" }}
          >
            <IconButton imgSrc={DOWNLOAD} text="PDF" />
            <IconButton imgSrc={MAIL} text="Mail" />
          </div>
        </section>

        <section className={s.reportContent}>
          {/* 창업할각(각도기, 캐릭터, QR코드) */}
          <ReportOutBox>
            <ReportInBox>
              <div>창업할각</div>
            </ReportInBox>
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
                height="15.83vw"
                className={b.column}
              >
                <ReportInBox width="46.72vw" height="6.15vw">
                  <div>적합한 청년창업지원사업</div>
                </ReportInBox>
                <ReportInBox width="46.72vw" height="6.15vw">
                  <div>적합한 청년창업지원사업</div>
                </ReportInBox>
              </ReportOutBox>

              {/* 관련 뉴스 2개 */}
              <ReportOutBox width="48.80vw" height="6.15vw">
                {news.slice(0, 2).map((item, idx, arr) => (
                  <React.Fragment key={item.link ?? idx}>
                    <NewsItem title={item.title ?? ""} url={item.link ?? ""} />
                    {idx < arr.length - 1 && <div className={s.newsDivider} />}
                  </React.Fragment>
                ))}
              </ReportOutBox>
            </div>
          </div>

          {/* swot 강점, 약점, 기회, 위협 */}
          <div className={s.swotBox}>
            <p className={s.swot}>{data.data.strength}</p>
            <p className={s.swot}>{data.data.weakness}</p>
            <p className={s.swot}>{data.data.opportunity}</p>
            <p className={s.swot}>{data.data.threat}</p>
          </div>

          {/* 추천 창업 계획 다이어그램 */}
          <ReportOutBox height="43.59vw" className={b.column}>
            <div className={s.recommendBox}>
              <p className={s.planText}>추천 창업 계획</p>

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
