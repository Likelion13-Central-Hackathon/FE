// 기본 메인 버튼
import React from "react";
import s from "./styles/BasicButton.module.scss";
import { SizeTextProps } from "../types/common";

interface ButtonProps extends SizeTextProps {
  onClick?: () => void;
}

const BasicButton: React.FC<ButtonProps> = ({
  width = "8.18vw",
  height = "3.33vw",
  text = "텍스트",
  onClick,
}) => {
  const style = {
    width,
    height,
  };

  return (
    <button className={s.button} style={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default BasicButton;
