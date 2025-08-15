// FormPage.tsx
import React, { useMemo, useState } from "react";
import styles from "../styles/FormPage.module.scss";
import background from "../../assets/images/formpage-background.svg";
import logo from "../../assets/images/main-logo.svg";
import InfoForm from "./components/InfoForm";
import ConsiderForm from "./components/ConsiderForm";
import BaseResource from "./components/BaseResource";
import RightOrbit from "../../components/RightOrbit";

/* ...FormData, UpdateForm 동일... */

const ORBIT_PRESETS = {
  info: {
    labels: ["창업지원 및 자원", "인적사항", "창업내용"] as [string, string, string],
    positions: {
      t1: { top: "23%", left: "-8.2%", transform: "rotate(45deg)" },
      t2: { top: "50%", left: "-9%",   transform: "rotate(0deg)"  }, // 가운데
      t3: { top: "77%", left: "-1%",   transform: "rotate(-45deg)" },
    },
  },
  consider: {
    labels: ["인적사항", "창업내용", "창업지원 및 자원"] as [string, string, string],
    positions: {
      // ← 여기 숫자만 바꾸면 즉시 반영됨 (HMR에서도)
      t1: { top: "25%", left: "-3.2%",   transform: "rotate(45deg)"  },
      t2: { top: "50%", left: "-9%", transform: "rotate(0deg)"   }, // 가운데(확실히 다르게)
      t3: { top: "80%", left: "-5.2%",   transform: "rotate(-45deg)" },
    },
  },
  base: {
    labels: ["창업내용", "창업지원 및 자원", "인적사항"] as [string, string, string],
    positions: {
      t1: { top: "25%", left: "-3.2%",    transform: "rotate(45deg)"  },
      t2: { top: "50%", left: "-14.7%",  transform: "rotate(0deg)"   }, // 가운데
      t3: { top: "78%", left: "-0.4%",  transform: "rotate(-45deg)" },
    },
  },
} as const;

const FormPage: React.FC = () => {
  const [step, setStep] = useState<"info" | "consider" | "base">("info");

  const [formData, setFormData] = useState<FormData>({
    age: "", region: "", isCollege: null, status: null, university: "",
    selectedField: null, supportRanks: {}, careers: null, statuses: null, itemText: "",
    team: null, capital: null, levels: {},
  });

  const updateForm: UpdateForm = (changes) =>
    setFormData((prev) => ({ ...prev, ...changes }));

  // ✅ step에 따라 라벨/좌표 즉시 계산
  const orbit = useMemo(() => ORBIT_PRESETS[step], [step]);

  return (
    <div className={styles.container}>
      <img className={styles.background} src={background} alt="background" />

      {/* RightOrbit는 계산된 프리셋을 그대로 props로 */}
      <RightOrbit labels={orbit.labels} positions={orbit.positions} showLabels />

      <div className={styles.formBox}>
        <img className={styles.logo} src={logo} alt="logo" />

        {step === "info" && (
          <InfoForm
            data={formData}
            updateForm={updateForm}
            onNext={() => setStep("consider")}
          />
        )}

        {step === "consider" && (
          <ConsiderForm
            data={formData}
            updateForm={updateForm}
            onPrev={() => setStep("info")}
            onNext={() => setStep("base")}
          />
        )}

        {step === "base" && (
          <BaseResource
            data={formData}
            updateForm={updateForm}
            onPrev={() => setStep("consider")}
          />
        )}
      </div>
    </div>
  );
};

export default FormPage;
