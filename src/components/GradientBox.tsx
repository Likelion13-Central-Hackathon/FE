import React from "react";
import s from "./styles/GradientBox.module.scss";
import { InBoxProps } from "../types/report";

const GradientBox: React.FC<InBoxProps> = ({
  width = "63.59vw",
  height = "45.31vw",
  children,
}) => {
  return (
    <div className={s.gradientBox} style={{ width, height }}>
      {children}
    </div>
  );
};

export default GradientBox;
