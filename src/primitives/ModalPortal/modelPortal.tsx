import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { ModalWrapper } from "./styled";

interface ModalInterface {
  children: ReactNode;
}

const Modal = (props: ModalInterface) => {
  const { children } = props;

  return ReactDOM.createPortal(
    <ModalWrapper>{children}</ModalWrapper>,
    document.getElementById("modal-root"),
  );
};

export default React.memo(Modal);
