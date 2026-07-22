import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import { createTeam } from "../../services/teamService";

const CreateTeamModal = ({
  show,
  handleClose,
  refreshTeams,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createTeam(formData);

      toast.success("Team created successfully");

      setFormData({
        name: "",
        description: "",
      });

      handleClose();

      refreshTeams();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create team"
      );

    } finally {

      setLoading(false);

    }

  };
  return (
  <Modal
    show={show}
    onHide={handleClose}
    centered
    dialogClassName="teams-modal"
  >
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton className="teams-modal-header">
        <Modal.Title className="teams-modal-title">
          <i className="bi bi-people-fill me-2"></i>
          Create Team
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="teams-modal-body">

        <Form.Group className="mb-4">
          <Form.Label className="teams-label">
            Team Name
          </Form.Label>

          <Form.Control
            className="teams-input"
            type="text"
            name="name"
            placeholder="Enter team name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="teams-label">
            Description
          </Form.Label>

          <Form.Control
            className="teams-input"
            as="textarea"
            rows={5}
            name="description"
            placeholder="Enter team description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

      </Modal.Body>

      <Modal.Footer className="teams-modal-footer">

        <Button
          className="teams-cancel-btn"
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="teams-save-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Creating...
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i>
              Create Team
            </>
          )}
        </Button>

      </Modal.Footer>
    </Form>
  </Modal>
);
};

export default CreateTeamModal;