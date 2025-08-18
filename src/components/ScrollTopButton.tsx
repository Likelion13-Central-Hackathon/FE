import React from "react";
import s from "./styles/ScrollTopButton.module.scss";
import TOP from "../assets/images/icon/top-icon.svg";

const ScrollTopButton: React.FC = () => {
  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={s.scrollTopBtn}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
    >
      <img src={TOP} alt="top-icon" className={s.icon} />
    </button>
  );
};

export default ScrollTopButton;
