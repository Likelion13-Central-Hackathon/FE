import React from "react";
import s from "./styles/Box.module.scss";
import { InBoxProps } from "../types/report";

const ReportInBox: React.FC<InBoxProps> = ({
  width = "23.13vw",
  height = "11.25vw",
  children,
}) => {
  return (
    <div className={s.inbox} style={{ width, height }}>
      {children}
    </div>
  );
};

export default ReportInBox;
