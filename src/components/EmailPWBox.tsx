import React from "react";
import s from "./styles/EmailPwBox.module.scss";

interface EmailPWBoxProps {
  email: string;
  password: string;
  onChangeEmail: (v: string) => void;
  onChangePassword: (v: string) => void;
  onSubmit?: () => void;
}

const EmailPWBox: React.FC<EmailPWBoxProps> = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}) => {
  return (
    <div className={s.emailBox}>
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

      <label className={s.label} htmlFor="pw-input">
        Password
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
    </div>
  );
};

export default EmailPWBox;
