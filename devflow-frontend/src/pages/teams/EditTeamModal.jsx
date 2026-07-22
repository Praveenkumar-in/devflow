import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import { updateTeam } from "../../services/teamService";

const EditTeamModal = ({
  show,
  handleClose,
  team,
  refreshTeams,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (team) {

      setFormData({
        name: team.team_name || "",
        description: team.description || "",
      });

    }

  }, [team]);

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

      await updateTeam(team.id, formData);

      toast.success("Team updated successfully");

      refreshTeams();

      handleClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update team"
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
    >
      <Form onSubmit={handleSubmit}>

        <Modal.Header closeButton>

          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Edit Team
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          {/* Team Name */}

          <Form.Group className="mb-3">

            <Form.Label>
              Team Name
            </Form.Label>

            <Form.Control
              type="text"
              name="name"
              placeholder="Enter team name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </Form.Group>

          {/* Description */}

          <Form.Group>

            <Form.Label>
              Description
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              placeholder="Enter team description"
              value={formData.description}
              onChange={handleChange}
              required
            />

          </Form.Group>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                ></span>
                Updating...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Update Team
              </>
            )}
          </Button>

        </Modal.Footer>

      </Form>
    </Modal>
  );
};

export default EditTeamModal;