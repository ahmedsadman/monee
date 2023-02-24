import Modal from "../../../common/components/Modal";

function UploadStatementModal({ show, onClose }: ModalProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <div>HEllo World</div>
    </Modal>
  );
}

type ModalProps = {
  show: boolean;
  onClose: () => void;
};

export default UploadStatementModal;
