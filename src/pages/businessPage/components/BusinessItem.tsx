import React from "react";
import s from "./Business.module.scss";
import LINK from "../../../assets/images/icon/link-icon.svg";
import ReportInBox from "../../../components/ReportInBox";

interface BusinessItemProps {
  title: string;
  region: string;
  supportArea: string;
  link: string;
}

const BusinessItem: React.FC<BusinessItemProps> = ({
  title,
  region,
  supportArea,
  link,
}) => {
  return (
    <ReportInBox width="46.72vw" height="5.52vw">
      <section className={s.businessItemContainer}>
        <div className={s.busiInfo}>
          {supportArea} | {region}
        </div>
        <div className={s.busiTitle}>{title}</div>
      </section>
      <button
        className={s.linkButton}
        onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
      >
        <p>본문접속</p>
        <img src={LINK} alt="link-icon" style={{ width: "0.52vw" }} />
      </button>
    </ReportInBox>
  );
};

export default BusinessItem;
