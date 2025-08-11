import React from "react";
import styles from './styles/FormPage.module.scss';
import background from '../assets/images/formpage-background.svg';
import logo from '../assets/images/main-logo.svg';

const FormPage = () => {
  return (
    <div className={styles.container}>
      {/* 배경 */}
      <img className={styles.background} src={background} alt="background" />

      {/* 폼 */}
      <div className={styles.formBox}>
        <img className={styles.logo} src={logo} alt="logo"/>

        <label className={styles.label}>몇 살이에요? 어디에서 사업을 하고 계신지도 알려주세요.</label>
        <div className={styles.row}>
          <input type="text" placeholder="Ex. 만 25세" />
          <button className={styles.regionBtn}>지역 선택하기</button>
        </div>

        <label className={styles.label}>현재 대학교에 다니고 있나요?</label>
        <div className={styles.row}>
          <button className={styles.choiceBtn}>예</button>
          <button className={styles.choiceBtn}>아니요</button>
        </div>

        <label className={styles.label}>어느 대학교에 다니고 계신가요? 학적상태도 알려주세요.</label>
        <div className={styles.row}>
          <input type="text" placeholder="학교 입력" />
          <select>
            <option value="">학적 선택</option>
            <option value="재학">재학</option>
            <option value="휴학">휴학</option>
            <option value="졸업">졸업</option>
          </select>
        </div>

        <button className={styles.submitBtn}>다음</button>
      </div>
    </div>
  );
};

export default FormPage;
