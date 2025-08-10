import React from "react";
import s from "./Report.module.scss";
import { SizeProps } from "../../../types/common";

interface OutBoxProps extends SizeProps {
  children?: React.ReactNode; // 하위 컴포넌트
}

const ReportOutBox: React.FC<OutBoxProps> = ({
  width = "63.65vw",
  height = "13.07vw",
  children,
}) => {
  return (
    <div className={s.outbox} style={{ width, height }}>
      {children}
    </div>
  );
};

export default ReportOutBox;
