"use client";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  amount?: number;
  y?: string;
  duration?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// 메인 스크롤 애니메이션
export default function FadeUp({
  children,
  amount = 0.2,
  y = "2vw",
  duration = 0.9,
  once = false,
  className,
  style,
}: Readonly<Props>) {
  return (
    <motion.div
      className={className}
      style={{ willChange: "opacity, transform", ...style }}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount, once }}
      transition={{
        ease: "easeOut",
        duration,
        opacity: { duration },
        y: { duration: duration * 0.7 },
      }}
    >
      {children}
    </motion.div>
  );
}
