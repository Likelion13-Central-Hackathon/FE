import React from "react";
import { useNavigate } from "react-router-dom";
import { SizeProps } from "../../types/common";
import LOGO from "../../assets/images/logo/main-logo.svg";

const Logo: React.FC<SizeProps> = ({ width = "8.8vw", height = "2.34vw" }) => {
  const navigate = useNavigate();

  return (
    <img
      src={LOGO}
      alt="Logo"
      style={{ width, height, cursor: "pointer" }}
      onClick={() => navigate("/")}
      draggable="false"
    />
  );
};

export default Logo;
