import React from "react";
import { SizeProps } from "../../types/common";
import LOGO from "../../assets/images/main-logo.svg";

const Logo: React.FC<SizeProps> = ({ width = "8.8vw", height = "2.34vw" }) => {
  return <img src={LOGO} alt="Logo" style={{ width, height }} />;
};

export default Logo;
