import React from "react";
import styles from "./Report.module.scss";
import NEWS from "../../../assets/images/icon/news-icon.svg";

type NewsItemProps = {
  title: string;
  url: string;
  openInNewTab?: boolean; // 새 탭 열기 여부
};

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  url,
  openInNewTab = true,
}) => {
  const target = openInNewTab ? "_blank" : "_self";
  const rel = openInNewTab ? "noopener noreferrer" : undefined;

  return (
    <div className={styles.newsItem}>
      <div className={styles.headerRow}>
        <img src={NEWS} alt="news-icon" style={{ width: "1.25vw" }} />
        <p className={styles.title} title={title}>
          {title}
        </p>
      </div>

      <a
        href={url}
        className={styles.link}
        target={target}
        rel={rel}
        title={url}
      >
        {url}
      </a>
    </div>
  );
};

export default NewsItem;
