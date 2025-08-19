import React from "react";
import s from "./styles/WarningModal.module.scss";
import BasicButton from "./BasicButton";
import warning from "../assets/images/icon/warning-icon.svg";

type Props = { onClose?: () => void };

const WarningModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={s.modalOverlay} role="dialog" aria-modal="true">
      <div className={s.modal}>
        <div className={s.icon}>
          <img src={warning} alt="경고 아이콘" />
        </div>
        <div className={s.message}>
          <p>질의응답을 생성할 수 없습니다.</p>
          <p>문항을 선택하고 작성해 주세요.</p>
        </div>
        <div className={s.buttonRow}>
          <BasicButton
            width="8.44vw"
            height="2.5vw"
            text="확인"
            onClick={() => onClose?.()}
          />
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
