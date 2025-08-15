import React, { useState } from "react";
import styles from "../styles/FormPage.module.scss";
import background from "../../assets/images/formpage-background.svg";
import logo from "../../assets/images/main-logo.svg";
import InfoForm from "./components/InfoForm";
import ConsiderForm from "./components/ConsiderForm";
import BaseResource from "./components/BaseResource";
import RightOrbit from "../../components/RightOrbit";

/* 모든 단계에서 공유할 데이터 스키마 */
export interface FormData {
  // Info
  age: string;
  region: string;
  isCollege: boolean | null;
  status: string | null;
  university: string;

  // Consider
  selectedField: string | null;
  supportRanks: Record<string, string>; // key: SUPPORT_ITEMS.key => rank
  careers: string | null;
  statuses: string | null; // 창업 현황 단계
  itemText: string;

  // BaseResource
  team: string | null;
  capital: string | null;
  levels: Record<string, string | null>; // key: resource.key => level
}
export type UpdateForm = (changes: Partial<FormData>) => void;

const FormPage: React.FC = () => {
  const [step, setStep] = useState<"info" | "consider" | "base">("info");

  const [formData, setFormData] = useState<FormData>({
    // Info
    age: "",
    region: "",
    isCollege: null,
    status: null,
    university: "",

    // Consider
    selectedField: null,
    supportRanks: {},
    careers: null,
    statuses: null,
    itemText: "",

    // BaseResource
    team: null,
    capital: null,
    levels: {},
  });

  const updateForm: UpdateForm = (changes) =>
    setFormData((prev) => ({ ...prev, ...changes }));

  return (
    <div className={styles.container}>
      <img className={styles.background} src={background} alt="background" />
      <RightOrbit size="sm" showLabels={false} />

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
