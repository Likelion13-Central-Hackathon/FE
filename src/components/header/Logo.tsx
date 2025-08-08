import React from "react";
import { ImageSizeProps } from "../../types/common";
import LOGO from "../../assets/images/main-logo.svg";

const Logo: React.FC<ImageSizeProps> = ({
  width = "8.8vw",
  height = "2.34vw",
}) => {
  return <img src={LOGO} alt="Logo" style={{ width, height }} />;
};

export default Logo;
