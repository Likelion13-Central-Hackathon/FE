import React, { useId } from "react";
import { motion } from "framer-motion";

type ProtractorStrokerProps = {
  angle: number; // 0~180
  radius?: number; // 반지름
  strokeWidth?: number;
  duration?: number; // 초
  className?: string;
};

const ProtractorStroker: React.FC<ProtractorStrokerProps> = ({
  angle,
  radius = 147,
  strokeWidth = 25,
  duration = 2,
  className,
}) => {
  const a = Math.max(0, Math.min(180, Math.round(angle)));
  const r = Math.max(0, Math.min(150, radius));

  const uid = useId();
  const gradId = `arcGrad-${uid}`;
  const fxId = `arcFx-${uid}`;

  const cx = 150;
  const baseY = 150;
  const leftX = cx - r;
  const rightX = cx + r;

  const arcPath = `M ${leftX} ${baseY} A ${r} ${r} 0 0 1 ${rightX} ${baseY}`;

  return (
    <svg
      viewBox="0 0 300 150" // 고정
      className={className}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="150"
          y1="0"
          x2="150"
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3D82FF" />
          <stop offset="100%" stopColor="#7B61FF" />
        </linearGradient>

        <filter id={fxId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0.42"
            stdDeviation="1.35"
            floodColor="#0400FA"
            floodOpacity="0.06"
          />
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
            values="0 0 0 0 0.016  0 0 0 0 0    0 0 0 0 0.980  0 0 0 1 0"
            result="inner2c"
          />
          <feMerge>
            <feMergeNode in="inner1c" />
            <feMergeNode in="inner2c" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={arcPath}
        fill="none"
        stroke={`url(#${gradId})`}
        filter={`url(#${fxId})`}
        strokeWidth={strokeWidth}
        //vectorEffect="non-scaling-stroke"
        pathLength={180}
        initial={{ strokeDasharray: "0 180" }}
        animate={{ strokeDasharray: `${a} 180` }}
        transition={{ duration, ease: "easeOut" }}
      />
    </svg>
  );
};

export default ProtractorStroker;
