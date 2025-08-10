import React from "react";
import s from "./Report.module.scss";
import { InBoxProps } from "../../../types/report";

const RecommendPlanLabel: React.FC<InBoxProps> = ({
  width = "20.89vw",
  height = "1.88vw",
  children,
}) => {
  return (
    <div className={s.label} style={{ width, height }}>
      {children}
    </div>
  );
};

export default RecommendPlanLabel;
