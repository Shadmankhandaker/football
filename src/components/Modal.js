import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CrossIcon } from "../assets/Icons";

const ModalWrapper = ({ children, show, onClose }) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [show]);

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscapeKeyDown);
    return () => {
      document.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return createPortal(
    <div className={`modal-wrapper ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close_btn" onClick={onClose}>
          <CrossIcon />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-portal")
  );
};

export default ModalWrapper;
