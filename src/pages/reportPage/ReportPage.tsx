import React from "react";
import s from "../styles/ReportPage.module.scss";
import data from "../../data/reportDummy.json";
import IconButton from "../../components/IconButton";
import DOWNLOAD from "../../assets/images/icon/download-icon.svg";
import MAIL from "../../assets/images/icon/mail-icon.svg";

const ReportPage = () => {
  return (
    <div className={s.reportPageWrapper}>
      <div className={s.reportContainer}>
        {/* 상단 제목 부분 + 아이콘 2개 */}
        <div className={s.titleContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
