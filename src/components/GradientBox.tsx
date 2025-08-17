import React from "react";
import s from "./styles/GradientBox.module.scss";
import { InBoxProps } from "../types/report";

type GradientBoxProps = InBoxProps & {
  ellipseTop?: string;
  ellipseRight?: string;
};

const GradientBox: React.FC<GradientBoxProps> = ({
  width = "63.59vw",
  height = "45.31vw",
  ellipseTop,
  ellipseRight,
  children,
}) => {
  return (
    <div className={s.gradientBox} style={{ width, height }}>
      {/* 노란 타원 */}
      <div
        className={s.ellipse}
        style={{
          top: ellipseTop,   
          right: ellipseRight, 
        }}
      />
      {children}
    </div>
  );
};

export default GradientBox;
