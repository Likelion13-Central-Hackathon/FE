import React from "react";
import s from "../styles/BusinessPage.module.scss";
import b from "../../components/styles/Box.module.scss";
import BACK from "../../assets/images/icon/back-icon.svg";
import MapBox from "./components/MapBox";
import ReportOutBox from "../../components/ReportOutBox";
import BusinessItem from "./components/BusinessItem";
import data from "../../data/businessDummy.json";

const BusinessPage = () => {
  return (
    <div className={s.businessWrapper}>
      <img
        src={BACK}
        alt="back-icon"
        style={{
          width: "2.81vw",
          height: "1.72vw",
          marginTop: "6.51vw",
          marginLeft: "2.19vw",
        }}
      />
      <div className={s.businessContainer}>
        <section className={s.titleBox}>
          <p className={s.businessTitle}>2025년 청년지원사업 통합 공고</p>
          <p className={s.businessSubTitle}>지방자치단체</p>
        </section>
        <section className={s.businessBox}>
          <MapBox />
          <ReportOutBox width="48.80vw" height="41.35vw" className={b.column}>
            <p className={s.regionFilter}>지역 | OO</p>
            <div className={s.businessItems}>
              {data.data.map((item) => (
                <BusinessItem
                  key={item.id}
                  title={item.title}
                  region={item.region}
                  supportArea={item.supportArea}
                  link={item.link}
                />
              ))}
            </div>

            <div>&lt; 페이지네이션 &gt;</div>
          </ReportOutBox>
        </section>
      </div>
    </div>
  );
};

export default BusinessPage;
