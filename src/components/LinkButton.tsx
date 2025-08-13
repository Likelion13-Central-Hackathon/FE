import React from "react";
import s from "./styles/LinkButton.module.scss";
import LINK from "../assets/images/icon/link-icon.svg";
import { LinkProps } from "../types/common";

// 본문접속 버튼
const LinkButton: React.FC<LinkProps> = ({ link }) => {
  return (
    <button
      className={s.linkButton}
      onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
    >
      <p>본문접속</p>
      <img src={LINK} alt="link-icon" style={{ width: "0.43vw" }} />
    </button>
  );
};

export default LinkButton;
