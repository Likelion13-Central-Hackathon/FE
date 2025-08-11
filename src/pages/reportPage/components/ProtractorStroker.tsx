import React, { useId } from "react";
import { motion } from "framer-motion";

type ProtractorStrokerProps = {
  angle: number; // 0~180
  strokeWidthVW?: string;
  duration?: number; // 초
  className?: string;
};

const ProtractorStroker: React.FC<ProtractorStrokerProps> = ({
  angle,
  strokeWidthVW = "29px",
  duration = 2,
  className,
}) => {
  const a = Math.max(0, Math.min(180, Math.round(angle)));
  const uid = useId();
  const gradId = `arcGrad-${uid}`;
  const fxId = `arcFx-${uid}`;

  return (
    <svg
      viewBox="0 0 300 150" // 지름 300, 반지름 150
      className={className}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="150"
          y1="0" // 중앙 위
          x2="150"
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3D82FF" />
          <stop offset="100%" stopColor="#7B61FF" />
        </linearGradient>

        <filter id={fxId} x="-50%" y="-50%" width="200%" height="200%">
          {/* drop shadow */}
          <feDropShadow
            dx="0"
            dy="0.42"
            stdDeviation="1.35"
            floodColor="#0400FA"
            floodOpacity="0.06"
          />
          {/* 핑크 */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.62" result="blur1" />
          <feOffset dx="-0.47" dy="-0.31" in="blur1" result="off1" />
          <feComposite
            in="off1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="inner1"
          />
          <feColorMatrix
            in="inner1"
            type="matrix"
            values="0 0 0 0 0.984  0 0 0 0 0.741  0 0 0 0 0.976  0 0 0 0.5 0"
            result="inner1c"
          />
          {/* 파랑 */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.62" result="blur2" />
          <feOffset dx="-0.47" dy="0.31" in="blur2" result="off2" />
          <feComposite
            in="off2"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="inner2"
          />
          <feColorMatrix
            in="inner2"
            type="matrix"
            values="0 0 0 0 0.016  0 0 0 0 0  0 0 0 0 0.980  0 0 0 1 0"
            result="inner2c"
          />
          {/* 합치기 */}
          <feMerge>
            <feMergeNode in="inner1c" />
            <feMergeNode in="inner2c" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 반원*/}
      <motion.path
        d="M 0 150 A 150 150 0 0 1 300 150"
        fill="none"
        stroke={`url(#${gradId})`}
        filter={`url(#${fxId})`}
        strokeWidth={strokeWidthVW}
        pathLength={180}
        initial={{ strokeDasharray: "0 180" }}
        animate={{ strokeDasharray: `${a} 180` }}
        transition={{ duration, ease: "easeOut" }}
      />
    </svg>
  );
};

export default ProtractorStroker;
