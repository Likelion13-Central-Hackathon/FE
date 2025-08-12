import React from "react";
import s from "./Report.module.scss";
import { OutBoxProps } from "../../../types/report";

const ReportOutBox: React.FC<OutBoxProps> = ({
  width = "63.65vw",
  height = "13.07vw",
  children,
  className,
}) => {
  return (
    <div className={`${s.outbox} ${className || ""}`} style={{ width, height }}>
      {children}
    </div>
  );
};

export default ReportOutBox;
