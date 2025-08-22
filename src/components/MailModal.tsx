import React, { useEffect, useState, useMemo } from "react";
import s from "./styles/MailModal.module.scss";
import GradientBox from "./GradientBox";
import ReportInBox from "./ReportInBox";
import EmailPWBox from "./EmailPWBox";
import BasicButton from "./BasicButton";
import character from "../assets/images/character-2d.svg";
import { checkPassword, checkEmail } from "../utils/validation";
import subscribeMailApi from "../api/report/subscribeMailApi";
import { reportSession } from "../utils/sessionStorage";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  open: boolean;
  email: string;
  password: string;
  onChangeEmail: (v: string) => void;
  onChangePassword: (v: string) => void;
  onClose: () => void;
};

const MailModal: React.FC<Props> = ({
  open,
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onClose,
}) => {
  const [step, setStep] = useState<"form" | "done">("form");
  const [loading, setLoading] = useState(false);

  // 열리면 form 모드로 설정
  useEffect(() => {
    if (open) {
      setStep("form");
      setLoading(false);
    }
  }, [open]);

  // Email, Password 유효성 검사
  const emailOK = useMemo(() => checkEmail(email), [email]);
  const pwCheck = useMemo(() => checkPassword(password), [password]);

  const isFormValid = emailOK && pwCheck.isValid;

  // 메일 구독 함수
  const handleNext = async () => {
    if (!isFormValid || loading) return;

    try {
      setLoading(true);
      const reportId = reportSession.read(); // 세션스토리지에서 reportId 조회
      if (!reportId) {
        throw new Error("유효한 reportId가 없습니다.");
      }
      // 메일 구독 api 조회
      await subscribeMailApi({
        email,
        password,
        reportId,
      });

      setStep("done");
    } catch (e) {
      console.error(e);
      alert("메일 구독 신청 실패.. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  if (loading) {
    return (
      <div className={s.modalOverlay}>
        <div className={s.headerBoxWrap}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className={s.modalOverlay} role="dialog" aria-modal="true">
      <GradientBox
        width="52.66vw"
        height="28.75vw"
        ellipseTop="55.25%"
        ellipseRight="-25%"
      >
        <div
          className={`${s.headerBoxWrap} ${
            step === "done" ? s.headerBoxWrapDone : ""
          }`}
        >
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
                  infoShow={true}
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
                disabled={!isFormValid || loading}
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
