import React from "react";
import s from "./Business.module.scss";

interface RegionButtonProps {
  region: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const RegionButton: React.FC<RegionButtonProps> = ({
  region,
  style,
  onClick,
}) => {
  return (
    <div className={s.regionButton} style={style} onClick={onClick}>
      {region}
    </div>
  );
};

export default RegionButton;
