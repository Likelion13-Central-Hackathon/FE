import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./Report.module.scss";
import ReportInBox from "../../../components/ReportInBox";
import { BusinessItemProps } from "../../../types/report";

const BusinessItem: React.FC<BusinessItemProps> = ({ business }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/business/result")}>
      <ReportInBox width="46.72vw" height="4.48vw">
        <div className={s.businessItemContainer}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className={s.businessTitle}>{business.title}</p>
            <p className={s.businessPercent}>적합률 {business.suitability}%</p>
          </div>
          <p className={s.businessDate}>
            신청 기간 | {business.startDate} ~ {business.endDate}
          </p>
        </div>
      </ReportInBox>
    </div>
  );
};

export default BusinessItem;
