import React from "react";
import s from "./Report.module.scss";
import CHART from "../../../assets/images/charts.svg";
import { rotateArray, startMonthIndex } from "../../../utils/date";
import { planStepTitles } from "../../../data/planLabelData";
import { RecommendPlanProps } from "../../../types/report";

const RecommendPlan: React.FC<RecommendPlanProps> = ({ createdAt, steps }) => {
  const yAxis = ["180°", "150°", "120°", "90°", "60°", "30°", "0°"];
  const xAxis = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const startIdx = startMonthIndex(createdAt); // 시작 월 인덱스
  const months = startIdx === null ? xAxis : rotateArray(xAxis, startIdx); // 최종 x축 배열

  return (
    <div className={s.planWrapper}>
      <div className={s.planContainer}>
        {/* Y축: 각도*/}
        <section className={s.planY} aria-label="Y axis">
          {yAxis.map((label) => (
            <div key={label} className={s.yTick}>
              {label}
            </div>
          ))}
        </section>
        <div className={s.rightSection}>
          {/* 다이어그램 이미지 */}
          <section className={s.planImg} aria-label="Plan image area">
            <img src={CHART} alt="diagram" />
          </section>
          {/* X축: 월 */}
          <section className={s.planX} aria-label="X axis">
            {months.map((label) => (
              <div key={label} className={s.xTick}>
                {label}
              </div>
            ))}
          </section>
        </div>
      </div>
      {/* 1,2,3,4단계 */}
      <div className={s.stepsWrapper}>
        {steps.map((step, idx) => (
          <div key={idx} className={s.stepGroup}>
            <p className={s.stepTitleItem}>{planStepTitles[idx]}</p>
            <p className={s.stepItem}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendPlan;
