import { useState } from "react";
import { toast } from "react-hot-toast";
import { createProject } from "../../services/projectService";

const CreateProjectModal = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "Planning",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      deadline: "",
      status: "Planning",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Project title is required");
    }

    try {
      setLoading(true);

      console.log("Sending:", formData);

      const res = await createProject(formData);

      console.log("Success:", res.data);

      toast.success(
        res.data.message || "Project created successfully"
      );

      resetForm();

      const modal = document.getElementById("createProjectModal");

      if (window.bootstrap && modal) {
        const instance =
          window.bootstrap.Modal.getInstance(modal);

        if (instance) {
          instance.hide();
        }
      }

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      console.log("Create Project Error:", err.response?.data);

      toast.error(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.errors?.[0]?.msg ||
        "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="createProjectModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div
          className="modal-content"
          style={{
            background: "#1e293b",
            color: "#fff",
            borderRadius: "20px",
          }}
        >
          <div className="modal-header border-0">
            <h4>Create Project</h4>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">
                  Project Title
                </label>

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
                <label className="form-label">
                  Description
                </label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Status
                  </label>

                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Planning">Planning</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Deadline
                  </label>

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

            <div className="modal-footer border-0">

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;