// 기본 메인 버튼
import React from "react";
import s from "./styles/BasicButton.module.scss";
import { SizeTextProps } from "../types/common";

interface ButtonProps extends SizeTextProps {
  onClick?: () => void;
  active?: boolean;
  className?: string;
  disabled?: boolean;
}

const BasicButton: React.FC<ButtonProps> = ({
  width = "8.18vw",
  height = "3.33vw",
  text = "텍스트",
  onClick,
  active = false,
  className = "",
  disabled = false,
}) => {
  const style = {
    width,
    height,
  };

  return (
    <button
      className={`${s.button} ${active ? s.active : ""} ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default BasicButton;
