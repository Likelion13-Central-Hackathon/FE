import React from "react";
import LOGO from "../../assets/images/main-logo.svg";

interface LogoProps {
  width?: string;
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ width = "8.8vw", height = "2.34vw" }) => {
  return <img src={LOGO} alt="Logo" style={{ width, height }} />;
};

export default Logo;
