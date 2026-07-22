import { Modal } from "react-bootstrap";

const DeleteNotificationModal = ({
  show,
  onHide,
  notification,
  onConfirm,
}) => {
  if (!notification) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="notification-delete-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Delete Notification
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <div className="text-center">

          <i
            className="bi bi-trash-fill text-danger"
            style={{ fontSize: "3rem" }}
          ></i>

          <h5 className="mt-3">
            Are you sure?
          </h5>

          <p className="text-muted mb-2">
            This notification will be permanently deleted.
          </p>

          <div className="fw-semibold">
            {notification.title}
          </div>

        </div>

      </Modal.Body>

      <Modal.Footer>

        <button
          className="btn btn-secondary"
          onClick={onHide}
        >
          Cancel
        </button>

        <button
          className="btn btn-danger"
          onClick={onConfirm}
        >
          <i className="bi bi-trash me-2"></i>
          Delete
        </button>

      </Modal.Footer>

    </Modal>
  );
};

export default DeleteNotificationModal;