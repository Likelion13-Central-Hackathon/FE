// src/components/RightOrbit.tsx
import React from "react";
import s from "./styles/RightOrbit.module.scss";

type Props = {
  labels?: string[];
  size?: "sm" | "md";     
  showLabels?: boolean;    
};

const RightOrbit: React.FC<Props> = ({
  labels = ["창업지원 및 자원", "인적사항", "창업내용"],
}) => {
  // 라벨을 3개 기준으로 3개 포인트를 배치 (각도는 SCSS에서 변수로 제어)
  return (    
    <div className={s.ring}>
      <div className={`${s.tick} ${s.t1}`}>
        <span className={`${s.label} ${s.dim}`}>{labels[0]}</span>
        <span className={s.dot} />
      </div>
      <div className={`${s.tick} ${s.t2}`}>
        <span className={`${s.dot} ${s.on}`} />
        <span className={s.label}>{labels[1]}</span>
      </div>
      <div className={`${s.tick} ${s.t3}`}>
        <span className={s.dot} />
        <span className={`${s.label} ${s.dim}`}>{labels[2]}</span>
      </div>
    </div>
  );
};

export default RightOrbit;
