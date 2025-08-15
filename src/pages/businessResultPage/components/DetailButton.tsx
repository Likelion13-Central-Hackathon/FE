import React from "react";
import s from "./BusinessResult.module.scss";

type DetailButtonProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const DetailButton: React.FC<DetailButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={s.detailButton}>
      자세히보기 &gt;
    </div>
  );
};

export default DetailButton;
