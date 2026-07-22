import { Modal, Button } from "react-bootstrap";

const DeleteTaskModal = ({
  show,
 handleClose,
  onConfirm,
  task,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-trash me-2 text-danger"></i>
          Delete Task
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <div className="text-center">

          <i
            className="bi bi-exclamation-triangle-fill text-danger"
            style={{ fontSize: "3rem" }}
          ></i>

          <h5 className="mt-3">
            Are you sure?
          </h5>

          <p className="text-muted">
            Do you really want to delete
            <br />
            <strong>{task?.title}</strong> ?
          </p>

          <small className="text-danger">
            This action cannot be undone.
          </small>

        </div>

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

export default DeleteTaskModal;