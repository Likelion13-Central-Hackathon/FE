import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import s from "./Report.module.scss";

export default function PlanImage({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  const prefersReduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    amount: 0.5,
    margin: "0px",
    once: true, // 한 번만
  });

  const variants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    show: { clipPath: "inset(0 0% 0 0)" },
  };

  return (
    <section ref={ref} className={s.planImg} aria-label="Plan image area">
      <motion.img
        src={src}
        alt={alt}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={variants}
        transition={
          prefersReduce ? { duration: 0 } : { duration: 2, ease: "easeOut" }
        }
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "contain",
        }}
      />
    </section>
  );
}
