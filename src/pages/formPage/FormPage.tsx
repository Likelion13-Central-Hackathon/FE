import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { submitFormRequestBody } from "../../utils/form/submitFormRequestBody";
import submitFormApi from "../../api/form/submitFormApi";
import Loading from "../../components/Loading";
import createReportApi from "../../api/form/createReportApi";
import { ideaSession, reportSession } from "../../utils/sessionStorage";

const STEPS: Step[] = ["info", "consider", "base"];

const ORBIT_PRESETS: Record<Step, OrbitPreset> = {
  info: {
    labels: ["창업지원 및 자원", "인적사항", "창업내용"],
    positions: {
      t1: { top: "23%", left: "-7.3%", transform: "rotate(45deg)" },
      t2: { top: "50%", left: "-8.5%", transform: "rotate(0deg)" },
      t3: { top: "77%", left: "-0.6%", transform: "rotate(-45deg)" },
    },
  },
  consider: {
    labels: ["인적사항", "창업내용", "창업지원 및 자원"],
    positions: {
      t1: { top: "25%", left: "-2.6%", transform: "rotate(45deg)" },
      t2: { top: "50%", left: "-8.5%", transform: "rotate(0deg)" },
      t3: { top: "80%", left: "-5%", transform: "rotate(-45deg)" },
    },
  },
  base: {
    labels: ["창업내용", "창업지원 및 자원", "인적사항"],
    positions: {
      t1: { top: "25%", left: "-2.6%", transform: "rotate(45deg)" },
      t2: { top: "50%", left: "-14.2%", transform: "rotate(0deg)" },
      t3: { top: "78%", left: "0.3%", transform: "rotate(-45deg)" },
    },
  },
};

// 초기 데이터
const INITIAL_FORM_DATA: FormData = {
  age: "",
  addressCity: "",
  addressDistrict: "",
  isEnrolled: null,
  university: null,
  academicStatus: null,

  interestArea: "",
  supportNeeds: {},
  businessAge: null,
  stage: null,
  description: "",

  teamSize: null,
  capital: null,
  resources: {},
};

const STEP_COMPONENTS: Record<Step, React.ComponentType<StepComponentProps>> = {
  info: InfoForm,
  consider: ConsiderForm,
  base: BaseResource,
};

const FormPage: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("info");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);

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

  // 최종 제출
  const handleSubmit = useCallback(async () => {
    if (submitting) return; // 중복 클릭 방지
    try {
      setSubmitting(true);

      const body = submitFormRequestBody(formData); // 3개의 form Request 조립

      // 1. 창업 아이디어 생성 api 호출
      const { ideaId } = await submitFormApi(body);
      ideaSession.save(ideaId); // 세션스토리지에 ideaId 저장

      // 2. 레포트 생성 api 호출
      const { reportId } = await createReportApi(ideaId);
      reportSession.save(reportId); // 세션스토리지에 reportId 저장

      // 성공 시 보고서 페이지로 이동
      navigate("/report", { replace: true });
    } catch {
      console.log("FormPage handleSubmit Error");
      alert("제출에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }, [submitting, formData, navigate]);

  const StepComponent = STEP_COMPONENTS[step];

  const stepProps: StepComponentProps = useMemo(() => {
    const props: StepComponentProps = { data: formData, updateForm };
    if (stepIndex > 0) props.onPrev = goPrev;
    // 마지막 스텝이면 onNext가 handleSubmit
    props.onNext = stepIndex < STEPS.length - 1 ? goNext : handleSubmit;
    return props;
  }, [formData, updateForm, goPrev, goNext, stepIndex, handleSubmit]);

  if (submitting) {
    return <Loading />;
  }

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
