import React from "react";
import s from "./BusinessResult.module.scss";
import { RankItemProps } from "../../../types/business";

const RankItem: React.FC<RankItemProps> = ({ rankImg, item }) => {
  return (
    <div style={{ position: "relative", width: "15.57vw", height: "21.67vw" }}>
      <img
        src={rankImg}
        alt="result-back"
        style={{ width: "100%", height: "100%" }}
      />
      <div className={s.rankBox}>
        <p className={s.rankPercent}>Percent | {item.suitability}%</p>
        <div className={s.rankInfo}>
          <p>분야 | {item.supportArea}</p>
          <p>지원사업 | {item.title}</p>
          <p>주관기관 | {item.agency}</p>
        </div>
        <p className={s.rankDate}>
          신청기간 | {item.startDate}~{item.endDate}
        </p>
      </div>
    </div>
  );
};

export default RankItem;
