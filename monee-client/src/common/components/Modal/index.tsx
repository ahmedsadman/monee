import React from "react";
import { Modal as MUIModal, Box } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function Modal({ show, onClose, children }: ModalProps) {
  return (
    <MUIModal open={show} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </MUIModal>
  );
}

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactElement;
};

export default Modal;
