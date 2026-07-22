import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

import { updateBug } from "../../services/bugService";
import { getProjects } from "../../services/projectService";
import { getUsers } from "../../services/userService";

const EditBugModal = ({
  show,
  handleClose,
  bug,
  onSuccess,
}) => {

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

  useEffect(() => {

    if (bug) {

      setFormData({
        project_id: bug.project_id || "",
        assigned_to: bug.assigned_to || "",
        title: bug.title || "",
        description: bug.description || "",
        priority: bug.priority || "Medium",
        status: bug.status || "Open",
      });

    }

  }, [bug]);

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

  return (

    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="bug-modal"
    >

      <Modal.Header closeButton>

        <Modal.Title>

          <i className="bi bi-pencil-square text-warning me-2"></i>

          Edit Bug

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <div className="row g-3">

          <div className="col-md-6">

            <label className="form-label">
              Project
            </label>

            <select
              className="form-select"
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
            >

              <option value="">
                Select Project
              </option>

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

          <div className="col-md-6">

            <label className="form-label">
              Assign To
            </label>

            <select
              className="form-select"
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
            >

              <option value="">
                Select Developer
              </option>

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

          <div className="col-12">

            <label className="form-label">
              Bug Title
            </label>

            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

          </div>

          <div className="col-12">

            <label className="form-label">
              Description
            </label>

            <textarea
              rows="4"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Priority
            </label>

            <select
              className="form-select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Status
            </label>

            <select
              className="form-select"
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

          <div className="col-12">

            <label className="form-label">
              Replace Screenshot
            </label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />

          </div>

        </div>
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
          variant="warning"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Updating...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              Update Bug
            </>
          )}
        </Button>

      </Modal.Footer>

    </Modal>

  );

  async function handleSubmit() {

    if (
      !formData.project_id ||
      !formData.assigned_to ||
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {

      setLoading(true);

      const data = new FormData();

      data.append("project_id", formData.project_id);
      data.append("assigned_to", formData.assigned_to);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priority", formData.priority);
      data.append("status", formData.status);

      if (screenshot) {
        data.append("screenshot", screenshot);
      }

      await updateBug(bug.id, data);

      toast.success("Bug updated successfully.");

      handleClose();

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update bug."
      );

    } finally {

      setLoading(false);

    }

  }

};

export default EditBugModal;