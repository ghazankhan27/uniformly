import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const MyPopup = ({ show, children }) => {
  return (
    <Modal isOpen={show} style={customStyles}>
      {children}
    </Modal>
  );
};
