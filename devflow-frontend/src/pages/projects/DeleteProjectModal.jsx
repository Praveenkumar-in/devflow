import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteProject } from "../../services/projectService";

const DeleteProjectModal = ({ project, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!project) return;

    try {
      setLoading(true);

      await deleteProject(project.id);

      toast.success("Project deleted");

      window.bootstrap.Modal.getInstance(
        document.getElementById("deleteProjectModal")
      ).hide();

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteProjectModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-white">

          <div className="modal-header border-secondary">
            <h5>Delete Project</h5>

            <button
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">

            <p>
              Are you sure you want to delete
            </p>

            <h5 className="text-danger">
              {project?.title}
            </h5>

            <p className="text-secondary mt-3">
              This action cannot be undone.
            </p>

          </div>

          <div className="modal-footer border-secondary">

            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;