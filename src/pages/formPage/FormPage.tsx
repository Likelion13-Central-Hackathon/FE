import React from "react";
import styles from "../styles/FormPage.module.scss";
import background from "../../assets/images/formpage-background.svg";
import logo from "../../assets/images/main-logo.svg";
import InfoForm from "./components/InfoForm"; // ✅ Q1~Q3 묶음

const FormPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <img className={styles.background} src={background} alt="background" />

      <div className={styles.formBox}>
        <img className={styles.logo} src={logo} alt="logo" />

        {/* ✅ 질문 묶음 컴포넌트 */}
        <InfoForm />

        
      </div>
    </div>
  );
};

export default FormPage;
