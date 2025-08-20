import React from "react";
import s from "./styles/EmailPwBox.module.scss";

interface EmailPWBoxProps {
  email: string;
  password: string;
  onChangeEmail: (v: string) => void;
  onChangePassword: (v: string) => void;
  onSubmit?: () => void;
  infoShow: boolean;
}

const EmailPWBox: React.FC<EmailPWBoxProps> = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  infoShow = false,
}) => {
  return (
    <div className={s.emailBox}>
      <section>
        <label className={s.label} htmlFor="email-input">
          E-mail
        </label>
        <input
          id="email-input"
          className={s.input}
          type="email"
          lang="en"
          inputMode="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
          autoComplete="email"
        />
      </section>
      <section>
        <label className={s.label} htmlFor="pw-input">
          Password
          {infoShow && (
            <span>영문 대·소문자, 숫자, 특수문자 중 2가지 이상 포함</span>
          )}
        </label>
        <input
          id="pw-input"
          className={s.input}
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
          autoComplete="current-password"
        />
      </section>
    </div>
  );
};

export default EmailPWBox;
