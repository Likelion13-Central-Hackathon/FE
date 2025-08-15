// src/components/RightOrbit.tsx
import React from "react";
import s from "./styles/RightOrbit.module.scss";

type PointPos = React.CSSProperties; // top/left/transform 등 자유롭게

type Props = {
  /** [왼쪽(위/좌), 가운데(활성), 오른쪽(아래/우)] */
  labels?: [string, string, string];
  /** 각 포인트 좌표/회전 등을 컴포넌트별로 덮어쓰기 */
  positions?: {
    t1?: PointPos;
    t2?: PointPos;
    t3?: PointPos;
  };
  size?: "sm" | "md";
  showLabels?: boolean;
};

const RightOrbit: React.FC<Props> = ({
  labels = ["창업지원 및 자원", "인적사항", "창업내용"],
  positions,
  showLabels = true,
}) => {
  return (
    <div className={s.ring}>
      {/* t1 */}
      <div className={`${s.tick} ${s.t1}`} style={positions?.t1}>
        {showLabels && <span className={`${s.label} ${s.dim}`}>{labels[0]}</span>}
        <span className={s.dot} />
      </div>

      {/* t2 — 가운데(활성) */}
      <div className={`${s.tick} ${s.t2}`} style={positions?.t2}>
        {showLabels && <span className={s.label}>{labels[1]}</span>}
        <span className={`${s.dot} ${s.on}`} />
      </div>

      {/* t3 */}
      <div className={`${s.tick} ${s.t3}`} style={positions?.t3}>
        {showLabels && <span className={`${s.label} ${s.dim}`}>{labels[2]}</span>}
        <span className={s.dot} />
      </div>
    </div>
  );
};

export default RightOrbit;
