import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface CounterProps {
  target: number; // 숫자
  duration?: number;
}

const text: React.CSSProperties = {
  fontSize: "1.04vw",
  fontWeight: "600",
  color: "#262626",
};

export const CountingScore: React.FC<CounterProps> = ({
  target,
  duration = 2,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const display = useTransform(rounded, (v) => `${v}°`);

  useEffect(() => {
    const controls = animate(count, target, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [target, duration, count]);

  return <motion.span style={text}>{display}</motion.span>;
};
