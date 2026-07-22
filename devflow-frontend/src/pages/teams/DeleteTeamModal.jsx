import { Modal, Button } from "react-bootstrap";

const DeleteTeamModal = ({
  show,
 handleClose,
  onConfirm,
  team,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
          Delete Team
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <div className="text-center">

          <i
            className="bi bi-trash3-fill text-danger"
            style={{ fontSize: "4rem" }}
          ></i>

          <h4 className="mt-3">
            Delete Team?
          </h4>

          <p className="text-muted mb-0">
            Are you sure you want to delete{" "}
            <strong>
              {team?.team_name}
            </strong>
            ?
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
          <i className="bi bi-trash3 me-2"></i>
          Delete Team
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTeamModal;