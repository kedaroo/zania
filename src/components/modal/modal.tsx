import React from "react";
import ReactDOM from "react-dom";
import './modal.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={props.onClose}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="icon-button"
          onClick={props.onClose}
        >
          &times;
        </button>
        {props.children}
      </div>
    </div>,
    document.body
  );
}
