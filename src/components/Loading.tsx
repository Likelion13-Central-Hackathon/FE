import React from "react";
import s from "./styles/Loading.module.scss";
import SvgLogo from "./SvgLogo";
import FloatingMotion from "./FloatingMotion";
import PLUS3D from "../assets/images/plus-3d.png";

const Loading = () => {
  return (
    <div className={s.loadingContainer}>
      <FloatingMotion mirrored={true} />
      <div className={s.loadingLogo}>
        <div className={s.logoImg}>
          <SvgLogo />
          <p>정확한 분석을 위해 1분 정도 소요될 수 있습니다.</p>
        </div>
      </div>
      <img src={PLUS3D} alt="plus-3d" className={s.plus3D} />
    </div>
  );
};

export default Loading;
