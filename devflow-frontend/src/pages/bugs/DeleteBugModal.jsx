import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const DeleteBugModal = ({
  show,
  handleClose,
  bug,
  onConfirm,
}) => {

  return (

    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="bug-delete-modal"
    >

      <Modal.Header closeButton>

        <Modal.Title>

          <i className="bi bi-trash-fill text-danger me-2"></i>

          Delete Bug

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >

          <div className="text-center">

            <i
              className="bi bi-exclamation-triangle-fill text-danger"
              style={{ fontSize: "4rem" }}
            ></i>

            <h4 className="mt-3">

              Delete this Bug?

            </h4>

            <p className="text-muted">

              This action cannot be undone.

            </p>

            {bug && (

              <div className="glass-card p-3 mt-3">

                <h5 className="mb-2">

                  {bug.title}

                </h5>

                <p className="mb-0 text-muted">

                  {bug.project_name}

                </p>

              </div>

            )}

          </div>

        </motion.div>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
        >
          <i className="bi bi-trash me-2"></i>

          Delete

        </Button>

      </Modal.Footer>

    </Modal>

  );

};

export default DeleteBugModal;