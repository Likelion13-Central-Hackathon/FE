import { useState, useCallback } from "react";

export const useReportMail = () => {
  const [isOpen, setIsOpen] = useState(false); // 메일 모달창
  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    email,
    password,
    open,
    close,
    setEmail,
    setPassword,
  };
};
