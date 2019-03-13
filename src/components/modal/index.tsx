import * as React from "react";
import ReactModal from "react-modal";
import { ModalContent, StyledModal } from "./modal.css";

export interface IModal {
  className: string;
  isOpen: boolean;
  ariaLabel?: string;
  content?: React.ReactNode;
  shouldCloseOnOverlayClick: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
}

const Modal: React.FC<IModal> = ({
  className,
  content,
  ariaLabel = "Alert Modal",
  isOpen,
  onAfterOpen,
  onRequestClose,
  shouldCloseOnOverlayClick
}) => {
  const modalClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <ReactModal
      ariaHideApp={process.env.NODE_ENV !== "test"}
      isOpen={isOpen}
      contentLabel={ariaLabel}
      overlayClassName={overlayClassName}
      className={modalClassName}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <ModalContent>{content}</ModalContent>
    </ReactModal>
  );
};

export default StyledModal(Modal);
