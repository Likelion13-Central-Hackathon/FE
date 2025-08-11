import React from "react";
import s from "./styles/IconButton.module.scss";

interface IconButtonProps {
  imgSrc: string;
  text: string;
}

const IconButton: React.FC<IconButtonProps> = ({ imgSrc, text }) => {
  return (
    <div className={s.iconBtn}>
      <img src={imgSrc} style={{ width: "1.88vw" }} />
      <p style={{ fontSize: "0.73vw", fontWeight: "500", color: "#757575" }}>
        {text}
      </p>
    </div>
  );
};

export default IconButton;
