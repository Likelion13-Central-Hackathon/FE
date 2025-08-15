import React from "react";
import s from "./Business.module.scss";
import ReportInBox from "../../../components/ReportInBox";
import LinkButton from "../../../components/LinkButton";

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
      <LinkButton link={link} />
    </ReportInBox>
  );
};

export default BusinessItem;
