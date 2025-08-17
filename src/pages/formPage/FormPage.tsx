import React, { useCallback, useMemo, useState } from "react";
import styles from "../styles/FormPage.module.scss";
import logo from "../../assets/images/logo/main-logo.svg";
import InfoForm from "./components/InfoForm";
import ConsiderForm from "./components/ConsiderForm";
import BaseResource from "./components/BaseResource";
import RightOrbit from "../../components/RightOrbit";

import {
  FormData,
  UpdateForm,
  Step,
  OrbitPreset,
  StepComponentProps,
} from "../../types/form";

const STEPS: Step[] = ["info", "consider", "base"];

const ORBIT_PRESETS: Record<Step, OrbitPreset> = {
  info: {
    labels: ["창업지원 및 자원", "인적사항", "창업내용"],
    positions: {
      t1: { top: "23%", left: "-8.2%", transform: "rotate(45deg)" },
      t2: { top: "50%", left: "-9%", transform: "rotate(0deg)" },
      t3: { top: "77%", left: "-1%", transform: "rotate(-45deg)" },
    },
  },
  consider: {
    labels: ["인적사항", "창업내용", "창업지원 및 자원"],
    positions: {
      t1: { top: "25%", left: "-3.2%", transform: "rotate(45deg)" },
      t2: { top: "50%", left: "-9%", transform: "rotate(0deg)" },
      t3: { top: "80%", left: "-5.2%", transform: "rotate(-45deg)" },
    },
  },
  base: {
    labels: ["창업내용", "창업지원 및 자원", "인적사항"],
    positions: {
      t1: { top: "25%", left: "-3.2%", transform: "rotate(45deg)" },
      t2: { top: "50%", left: "-14.7%", transform: "rotate(0deg)" },
      t3: { top: "78%", left: "-0.4%", transform: "rotate(-45deg)" },
    },
  },
};

const INITIAL_FORM_DATA: FormData = {
  age: "",
  region: "",
  isCollege: null,
  status: null,
  university: "",
  selectedField: null,
  supportRanks: {},
  careers: null,
  statuses: null,
  itemText: "",
  team: null,
  capital: null,
  levels: {},
};

const STEP_COMPONENTS: Record<Step, React.ComponentType<StepComponentProps>> = {
  info: InfoForm,
  consider: ConsiderForm,
  base: BaseResource,
};

const FormPage: React.FC = () => {
  const [step, setStep] = useState<Step>("info");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const updateForm: UpdateForm = useCallback((changes) => {
    setFormData((prev) => ({ ...prev, ...changes }));
  }, []);

  const orbit = useMemo(() => ORBIT_PRESETS[step], [step]);
  const stepIndex = useMemo(() => STEPS.indexOf(step), [step]);

  const goNext = useCallback(() => {
    setStep((prev) =>
      prev === "info" ? "consider" : prev === "consider" ? "base" : prev
    );
  }, []);

  const goPrev = useCallback(() => {
    setStep((prev) =>
      prev === "base" ? "consider" : prev === "consider" ? "info" : prev
    );
  }, []);

  const StepComponent = STEP_COMPONENTS[step];
  const stepProps: StepComponentProps = useMemo(() => {
    const props: StepComponentProps = { data: formData, updateForm };
    if (stepIndex > 0) props.onPrev = goPrev;
    if (stepIndex < STEPS.length - 1) props.onNext = goNext;
    return props;
  }, [formData, updateForm, goPrev, goNext, stepIndex]);

  return (
    <div className={styles.container}>
      <RightOrbit
        labels={orbit.labels}
        positions={orbit.positions}
        showLabels
      />

      <div className={styles.formBox}>
        <img className={styles.logo} src={logo} alt="logo" />
        <StepComponent {...stepProps} />
      </div>
    </div>
  );
};

export default FormPage;
