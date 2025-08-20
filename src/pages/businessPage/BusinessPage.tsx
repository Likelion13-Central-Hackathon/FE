import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/BusinessPage.module.scss";
import b from "../../components/styles/Box.module.scss";
import BACK from "../../assets/images/icon/back-icon.svg";
import CHAR from "../../assets/images/character-2d.png";
import MapBox from "./components/MapBox";
import ReportOutBox from "../../components/ReportOutBox";
import BusinessItem from "./components/BusinessItem";
import data from "../../data/businessDummy.json";

const BusinessPage = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState("서울"); // 선택된 지역
  const filteredData = data.data.filter(
    (item) => item.region === region || item.region === "전국"
  );

  return (
    <div className={s.businessWrapper}>
      <img
        src={BACK}
        alt="back-icon"
        className={s.backButton}
        onClick={() => navigate("/business/result")}
      />
      <div className={s.businessContainer}>
        <section className={s.titleBox}>
          <p className={s.businessTitle}>2025년 청년지원사업 통합 공고</p>
          <p className={s.businessSubTitle}>지방자치단체</p>
        </section>
        <section className={s.businessBox}>
          <MapBox onRegionSelect={setRegion} />
          <ReportOutBox width="48.80vw" height="41.35vw" className={b.column}>
            <p className={s.regionFilter}>지역 | {region}</p>
            <div className={s.businessItems}>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <BusinessItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    region={item.region}
                    supportArea={item.supportArea}
                    link={item.link}
                  />
                ))
              ) : (
                <p className={s.noDataMessage}>
                  현재 모집 중인 지원사업이 없어요!
                  <img src={CHAR} alt="char-2d" style={{ width: "9vw" }} />
                </p>
              )}
            </div>

            <div>&lt; 페이지네이션 &gt;</div>
          </ReportOutBox>
        </section>
      </div>
    </div>
  );
};

export default BusinessPage;
