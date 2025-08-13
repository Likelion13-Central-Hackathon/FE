import React from "react";
import s from "./BusinessResult.module.scss";

type RankItemProps = {
  rankImg: string; // 이미지 경로
};

const ResultItem: React.FC<RankItemProps> = ({ rankImg }) => {
  return (
    <div style={{ position: "relative", width: "15.57vw", height: "21.67vw" }}>
      <img
        src={rankImg}
        alt="result-back"
        style={{ width: "100%", height: "100%" }}
      />
      <div className={s.rankBox}>
        <p className={s.rankPercent}>Percent | 00%</p>
        <div className={s.rankInfo}>
          <p>분야 | oooooo</p>
          <p>지원사업 | oooooooooo</p>
          <p>주관기관 | ooooo</p>
        </div>
        <p className={s.rankDate}>신청기간 | 00.00~00.00</p>
      </div>
    </div>
  );
};

export default ResultItem;
