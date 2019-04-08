import * as React from "react";
import ReactModal from "react-modal";
import { RouteComponentProps } from "react-router";
import { ModalContent, StyledModal } from "./modal.css";
import Close from "../close";

export interface IModal {
  className: string;
  isOpen: boolean;
  ariaLabel?: string;
  content?: React.ReactNode;
  shouldCloseOnOverlayClick: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
}

const BaseModal: React.FC<IModal> = ({
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

export const Modal = StyledModal(BaseModal);

export const NamedModal: (
  name: string,
  content: React.ReactNode
) => React.FC<RouteComponentProps> = (name, content) => props => {
  const re = new RegExp(`${name}`);
  const shouldModalOpen = (locationPath: string) => re.test(locationPath);
  const onRequestClose = () => props.history.push("/");
  return (
    <>
      <Modal
        className={name}
        isOpen={shouldModalOpen(props.location.pathname)}
        onRequestClose={onRequestClose}
        content={content}
        shouldCloseOnOverlayClick={true}
      />
    </>
  );
};
