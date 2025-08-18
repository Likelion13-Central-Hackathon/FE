import React from "react";
import character from "../assets/images/error-3Dcharacter.svg";
import warningtext from "../assets/images/error-warningtext.svg";
import styles from "./styles/NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img className={styles.character} src={character} alt="character" />
      <img className={styles.warningtext} src={warningtext} alt="warningtext" />
    </div>
  );
};

export default NotFoundPage;
