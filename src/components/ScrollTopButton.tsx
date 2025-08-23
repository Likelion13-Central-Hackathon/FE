import React, { useState, useEffect } from "react";
import s from "./styles/ScrollTopButton.module.scss";
import TOP from "../assets/images/icon/top-icon.svg";

const ScrollTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        // 스크롤 맨 위일땐 안보이도록
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        className={s.scrollTopBtn}
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
      >
        <img src={TOP} alt="top-icon" className={s.icon} />
      </button>
    )
  );
};

export default ScrollTopButton;
