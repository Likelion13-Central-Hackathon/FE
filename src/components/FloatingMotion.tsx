import React from "react";
import s from "./styles/FloatingMotion.module.scss";

import IMG1 from "../assets/images/floating/floating1.png";
import IMG2 from "../assets/images/floating/floating2.png";
import IMG3 from "../assets/images/floating/floating3.png";
import IMG4 from "../assets/images/floating/floating4.png";
import CHAR from "../assets/images/floating/character.png";

const FloatingMotion: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.floatingWrapper}>
        <img
          src={IMG1}
          alt="floating1"
          className={`${s.floatingImage} ${s.img1}`}
        />
        <img
          src={IMG2}
          alt="floating2"
          className={`${s.floatingImage} ${s.img2}`}
        />
        <img
          src={IMG3}
          alt="floating3"
          className={`${s.floatingImage} ${s.img3}`}
        />
        <img
          src={IMG4}
          alt="floating4"
          className={`${s.floatingImage} ${s.img4}`}
        />
      </div>
      <div className={s.characterWrapper}>
        <img src={CHAR} alt="character" className={s.characterImage} />
      </div>
    </div>
  );
};

export default FloatingMotion;
