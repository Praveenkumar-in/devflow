import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

import { createBug } from "../../services/bugService";
import { getProjects } from "../../services/projectService";
import { getUsers } from "../../services/userService";

const CreateBugModal = ({ show, handleClose, onSuccess }) => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState(null);

  const [formData, setFormData] = useState({
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  useEffect(() => {
    if (show) {
      loadData();
    }
  }, [show]);

  const loadData = async () => {
    try {
      const [projectRes, userRes] = await Promise.all([
        getProjects(),
        getUsers(),
      ]);

      setProjects(projectRes.data.projects || []);
      setUsers(userRes.data.users || []);
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (
      !formData.project_id ||
      !formData.assigned_to ||
      !formData.title ||
      !formData.description
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (screenshot) {
        data.append("screenshot", screenshot);
      }

      await createBug(data);

      toast.success("Bug created successfully");

      setFormData({
        project_id: "",
        assigned_to: "",
        title: "",
        description: "",
        priority: "Medium",
        status: "Open",
      });

      setScreenshot(null);

      handleClose();

      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create bug"
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
    size="lg"
    dialogClassName="task-modal"
  >
    <Modal.Header closeButton>
      <Modal.Title>
        <i className="bi bi-bug-fill text-danger me-2"></i>
        Report New Bug
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>

      <div className="row g-3">

        {/* Project */}

        <div className="col-md-6">

          <label className="form-label">
            Project
          </label>

          <select
            className="form-select premium-input"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.title}
              </option>
            ))}

          </select>

        </div>

        {/* Assign */}

        <div className="col-md-6">

          <label className="form-label">
            Assign To
          </label>

          <select
            className="form-select premium-input"
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
          >
            <option value="">Select Developer</option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.full_name}
              </option>
            ))}

          </select>

        </div>

        {/* Title */}

        <div className="col-12">

          <label className="form-label">
            Bug Title
          </label>

          <input
            type="text"
            className="form-control premium-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter bug title"
          />

        </div>

        {/* Description */}

        <div className="col-12">

          <label className="form-label">
            Description
          </label>

          <textarea
            rows={4}
            className="form-control premium-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue..."
          />

        </div>

        {/* Priority */}

        <div className="col-md-6">

          <label className="form-label">
            Priority
          </label>

          <select
            className="form-select premium-input"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        {/* Status */}

        <div className="col-md-6">

          <label className="form-label">
            Status
          </label>

          <select
            className="form-select premium-input"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

        </div>

        {/* Screenshot */}

        <div className="col-12">

          <label className="form-label">
            Screenshot
          </label>

          <input
            type="file"
            accept="image/*"
            className="form-control premium-input"
            onChange={handleFileChange}
          />

        </div>

      </div>

    </Modal.Body>

    <Modal.Footer>

      <Button
        variant="outline-light"
        onClick={handleClose}
        disabled={loading}
      >
        <i className="bi bi-x-circle me-2"></i>

        Cancel

      </Button>

      <Button
        variant="danger"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>

            Creating...

          </>
        ) : (
          <>
            <i className="bi bi-bug-fill me-2"></i>

            Create Bug
          </>
        )}

      </Button>

    </Modal.Footer>

  </Modal>
);
};

export default CreateBugModal;