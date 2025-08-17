import React, { useEffect, useState } from "react";
import s from "./styles/MailModal.module.scss";
import GradientBox from "./GradientBox";
import ReportInBox from "./ReportInBox";
import EmailPWBox from "./EmailPWBox";
import BasicButton from "./BasicButton";
import character from "../assets/images/character-2d.svg";

type Props = {
  open: boolean;
  email: string;
  password: string;
  onChangeEmail: (v: string) => void;
  onChangePassword: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const MailModal: React.FC<Props> = ({
  open,
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onClose,
}) => {

  const [step, setStep] = useState<"form" | "done">("form");

  useEffect(() => {
    if (open) setStep("form");
  }, [open]);

  const handleNext = () => {
    onSubmit?.();
    setStep("done");
  };

  if (!open) return null;

  return (
    <div className={s.modalOverlay} role="dialog" aria-modal="true">
      <GradientBox width="52.66vw" height="28.75vw" ellipseTop="55.25%" ellipseRight="-25%">
        <div
  className={`${s.headerBoxWrap} ${step === "done" ? s.headerBoxWrapDone : ""}`}>
    <ReportInBox
      width="17.92vw"
      height={step === "done" ? "3.33vw" : "4.58vw"}
    >
      <div
        className={`${s.headerBoxInner} ${
          step === "done" ? s.headerBoxInnerDone : ""
        }`}
      >
        {step === "form" ? (
          <>
            매주 업데이트 되는 청년창업 로드맵을
            <br />
            메일로 받아보세요.
          </>
        ) : (
          <>이메일이 정상적으로 등록되었습니다.</>
        )}
      </div>
    </ReportInBox>
  </div>

        <img
          className={`${s.character} ${step === "done" ? s.characterDone : ""}`}
          src={character}
          alt="character"
        />

        {step === "form" ? (
          <>
            <div className={s.formArea}>
              <ReportInBox width="25.26vw" height="10.89vw">
                <EmailPWBox
                  email={email}
                  password={password}
                  onChangeEmail={onChangeEmail}
                  onChangePassword={onChangePassword}
                  onSubmit={handleNext}
                />
              </ReportInBox>
            </div>

            <div className={s.buttonRow}>
              <BasicButton
                width="5.26vw"
                height="1.61vw"
                text="다음"
                onClick={handleNext}
                className={s.smallBtn}
              />
              <BasicButton
                width="5.26vw"
                height="1.61vw"
                text="취소"
                onClick={onClose}
                className={s.smallBtn}
              />
            </div>
          </>
        ) : (
          <div className={s.successWrap} data-layout="center">
            <img className={s.doneImage} src={character} alt="character" />

            <div className={`${s.okRow} ${s.buttonRow}`}>
              <BasicButton
                width="8.07vw"
                height="1.93vw"
                text="확인"
                onClick={onClose}
              />
            </div>
          </div>
        )}
      </GradientBox>
    </div>
  );
};

export default MailModal;
