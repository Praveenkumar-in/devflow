import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { updateProject } from "../../services/projectService";

const EditProjectModal = ({ project, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Planning",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        status: project.status || "Planning",
        deadline: project.deadline
          ? project.deadline.substring(0, 10)
          : "",
      });
    }
  }, [project]);

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

      await updateProject(project.id, formData);

      toast.success("Project updated successfully");

      window.bootstrap.Modal.getInstance(
        document.getElementById("editProjectModal")
      ).hide();

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="editProjectModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-dark text-white">

          <div className="modal-header border-secondary">
            <h5>Edit Project</h5>

            <button
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="mb-3">
                <label>Project Title</label>

                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Description</label>

                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label>Status</label>

                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Planning</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                  </select>

                </div>

                <div className="col-md-6 mb-3">

                  <label>Deadline</label>

                  <input
                    type="date"
                    className="form-control"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            <div className="modal-footer border-secondary">

              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                type="button"
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Project"}
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;