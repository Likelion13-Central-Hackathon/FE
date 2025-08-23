import React from "react";
import s from "../styles/ScrollDown.module.scss";

const ScrollDown = () => {
  return (
    <div className={s.scrollDownContainer}>
      <div className={s["btn-motion"]}>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ScrollDown;
