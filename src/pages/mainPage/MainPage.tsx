import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/MainPage.module.scss";
import IntroLayout from "../../components/IntroLayout";
import BasicButton from "../../components/BasicButton";
import ScrollTextBox from "./componenets/ScrollTextBox";
import ReportInBox from "../../components/ReportInBox";
import Footer from "./componenets/Footer";
import ScrollTopButton from "../../components/ScrollTopButton";

import TITLE from "../../assets/images/logo/first-logo.svg";
import LOGO1 from "../../assets/images/logo/scroll-logo1.png";
import LOGO2 from "../../assets/images/logo/scroll-logo2.png";
import DOCUMENT from "../../assets/images/main/main-document.png";
import MAP from "../../assets/images/main/main-map.png";
import REPORT from "../../assets/images/main/main-report.png";
import BUSINESS from "../../assets/images/main/main-business.png";
import CHAR from "../../assets/images/character-2d.svg";
import LINE1 from "../../assets/images/main/line1.svg";
import LINE2 from "../../assets/images/main/line2.svg";
import FadeUp from "./componenets/FadeUp";

const MainPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <IntroLayout
        title={TITLE}
        text={`청년의 시작, 확신으로 바꾸다.\n클릭 한 번으로 알아보는 나의 창업 유형`}
        height="5.92vw"
        main={true}
      >
        <div className={s.buttonContainer}>
          <BasicButton
            text="분석할각?"
            onClick={() => handleNavigate("/form-intro")}
          />
          <BasicButton
            text="선정될각?"
            onClick={() => handleNavigate("/document-intro")}
          />
        </div>
      </IntroLayout>
      {/* 하단 스크롤 */}
      <div className={s.scrollSection}>
        <FadeUp>
          <div className={s.logoBox1}>
            <img src={LOGO1} alt="scroll-logo1" style={{ width: "22.40vw" }} />
            <p>{`지역의 미래는 창업에서 시작됩니다. 당신의 가능성을\n분석해 드립니다.`}</p>
          </div>
        </FadeUp>
        {/* 레포트 */}
        <FadeUp>
          <section className={s.section1}>
            <img src={REPORT} alt="main-report" style={{ width: "24.74vw" }} />
            <ScrollTextBox
              title={`나의 창업에 꼭 필요한 정보와 전략, \n매주 맞춤 레포트로 전해 드립니다.`}
              subTitle="매주 도착하는 나의 창업 레포트"
              text={`매주 메일로 나의 창업에 꼭 맞는 중요한 이슈와 정보를 받아보세요.\n최신 트렌드와 업계 흐름은 물론, SWOT 분석과\n추천 창업 계획, 적합한 지원 사업까지 \n청년 창업가의 고민을 레포트 한 장으로 해결해 줘요.`}
              alignment="left"
              marginTop="6.67vw"
            />
          </section>
          <img src={LINE1} alt="line1" className={s.line1} />
        </FadeUp>
        {/* 지도, 지원사업 */}
        <FadeUp>
          <section className={s.section2}>
            <div>
              <ScrollTextBox
                title={`지원 사업 찾느라 헤매지 말고\n딱 맞는 것만 바로 지원하세요.`}
                subTitle="매주 추천받는 나의 맞춤 지원 사업 TOP3"
                text={`최신화되는 수많은 지원 사업, 이제 직접 찾을 필요 없어요.\n나의 창업 아이템과 가장 잘 맞는 TOP3 지원 사업을 선별하여 추천드려요.\n어떤 지원 사업에 지원할지 망설이는 청년 창업가들의 고민을 한 번에 해결해요.\n전국 공고를 한눈에 보고, 원하는 지역만 골라 확인할 수도 있어요.`}
                direction="right"
                alignment="right"
                marginTop="18.13vw"
              />
              <div className={s.logoBox2}>
                <img
                  src={LOGO2}
                  alt="scroll-logo2"
                  style={{ width: "22.40vw", marginTop: "21.25vw" }}
                />
                <p>{`지원 사업 선정,\n지역 경제 활성화의 첫 걸음입니다.`}</p>
              </div>
            </div>
            <div className={s.imgTwo}>
              <img src={MAP} alt="main-map" style={{ width: "24.74vw" }} />
              <img
                src={BUSINESS}
                alt="main-business"
                style={{ width: "24.74vw" }}
              />
            </div>
            <img src={LINE2} alt="line2" className={s.line2} />
          </section>
        </FadeUp>
        <FadeUp>
          {/* 캐릭터 + 말풍선 */}
          <div className={s.characterBox}>
            <ReportInBox width="25.88vw" height="6.61vw">
              <p style={{ fontSize: "1.67vw", fontWeight: 400 }}>
                사업계획서 첨삭해 드려요
              </p>
            </ReportInBox>
            <img src={CHAR} alt="character-2d" style={{ width: "6.5vw" }} />
          </div>

          {/* 서류(선정될각) */}
          <section className={s.section3}>
            <img
              src={DOCUMENT}
              alt="main-document"
              style={{ width: "42.08vw" }}
            />
            <ScrollTextBox
              title={`사업계획서는 스마트하게,\n질의응답은 철저하게.`}
              subTitle="AI 기반 사업계획서 첨삭 & 질의응답 대비"
              text={`사업계획서 작성, 더 이상 혼자 고민하지 마세요.\nAI가 문장을 다듬고 부족한 부분을 채워줍니다.\n사업계획서에 따른 질의응답까지 대비할 수 있도록\n예상 질문과 최적의 답변을 자동으로 제공합니다.\n지원부터 끝까지 AI가 함께합니다.`}
              marginTop="0.15vw"
            />
          </section>
        </FadeUp>
        {/* 푸터 */}
        <Footer />
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default MainPage;
