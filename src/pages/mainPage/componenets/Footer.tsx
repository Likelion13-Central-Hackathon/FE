import React from "react";
import s from "../styles/Footer.module.scss";
import LOGO from "../../../assets/images/logo/footer-logo.png";
import QR from "../../../assets/images/main/qr-code.png";
import PLUS from "../../../assets/images/plus-3d.png";

const Footer = () => {
  return (
    <div className={s.footerContainer}>
      {/* 왼쪽 */}
      <section className={s.footerLeft}>
        <img src={LOGO} alt="footer-logo" style={{ width: "27.55vw" }} />
        <p>{`청년의 가능성을, 레포트와 함께.\n스스로 일자리를 만드는 선택지.\n청년이 ‘하고 싶은 일’을 시도해 볼 수 있도록, 실질적인 지원을 제공합니다.\nAI 기반의 맞춤 성장 가이드.\n막연한 창업이 아닌, 데이터 기반의 계획 설정과 SWOT 분석으로\n청년의 도전이 ‘가능성’에서 ‘성과’로 이어지도록 돕습니다.`}</p>
      </section>
      {/* 오른쪽 */}
      <section className={s.footerRight}>
        <img src={PLUS} alt="plus-3d" className={s.plus3D} />
        <div className={s.qrText}>
          창업 유형을 다시 분석해 보고 싶다면? QR을 찍어줘.
        </div>
        <div className={s.qrImg}>
          <p>ⓒ Likelion 13th Hansung univ. [아직 한 방 남았다.] 팀</p>
          <img src={QR} alt="qr-code" style={{ width: "6.15vw" }} />
        </div>
      </section>
    </div>
  );
};

export default Footer;
