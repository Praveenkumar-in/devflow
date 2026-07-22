import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { getProjectById } from "../../services/projectService";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      setLoading(true);

      const res = await getProjectById(id);

      setProject(res.data.project);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-info"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="alert alert-danger">
        Project not found.
      </div>
    );
  }

  const badgeColor = {
    Planning: "bg-warning text-dark",
    Active: "bg-primary",
    Completed: "bg-success",
    "On Hold": "bg-secondary",
  };

  const progress =
    project.status === "Completed"
      ? 100
      : project.status === "Active"
      ? 60
      : project.status === "Planning"
      ? 20
      : 10;

  return (
    <motion.div
      className="container-fluid"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="text-white fw-bold">
            {project.title}
          </h2>

          <p className="text-secondary mb-0">
            Project Details
          </p>
        </div>

        <Link
          to="/projects"
          className="btn btn-outline-light"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>

      </div>

      <div className="row g-4">

        <div className="col-lg-8">

          <div className="glass-card p-4 mb-4">

            <div className="d-flex justify-content-between align-items-center">

              <h3 className="text-white fw-bold">
                {project.title}
              </h3>

              <span
                className={`badge ${
                  badgeColor[project.status] ||
                  "bg-secondary"
                }`}
              >
                {project.status}
              </span>

            </div>

            <hr />

            <h6 className="text-info mb-3">
              Description
            </h6>

            <p className="text-light fs-6">
              {project.description}
            </p>

          </div>

          <div className="glass-card p-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h4 className="text-white">
                Progress
              </h4>

              <span className="text-info fw-bold">
                {progress}%
              </span>

            </div>

            <div
              className="progress"
              style={{ height: "12px" }}
            >
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>

            <small className="text-secondary">
              Estimated Progress
            </small>

          </div>

        </div>

        <div className="col-lg-4">

       <div className="glass-card p-4 mb-4">

            <h4 className="text-white mb-4">
              Information
            </h4>

            <div className="info-item">
              <i className="bi bi-calendar-event"></i>

              <div>
                <small>Deadline</small>

                <h6>
                  {project.deadline
                    ? new Date(project.deadline).toLocaleDateString()
                    : "No Deadline"}
                </h6>
              </div>
            </div>

            <div className="info-item">
              <i className="bi bi-clock-history"></i>

              <div>
                <small>Created On</small>

                <h6>
                  {project.created_at
                    ? new Date(project.created_at).toLocaleDateString()
                    : "-"}
                </h6>
              </div>
            </div>

            <div className="info-item">
              <i className="bi bi-person"></i>

              <div>
                <small>Created By</small>

                <h6>
                  {project.created_by_name || "-"}
                </h6>
              </div>
            </div>

          </div>

          <div className="glass-card p-4">

            <h4 className="text-white mb-4">
              Statistics
            </h4>

            <div className="row g-3">

              <div className="col-4">
                <div className="stat-box text-center">

                  <i className="bi bi-list-task text-info fs-2"></i>

                  <h3 className="mt-2 text-info">
                    0
                  </h3>

                  <small>Tasks</small>

                </div>
              </div>

              <div className="col-4">
                <div className="stat-box text-center">

                  <i className="bi bi-bug text-danger fs-2"></i>

                  <h3 className="mt-2 text-danger">
                    0
                  </h3>

                  <small>Bugs</small>

                </div>
              </div>

              <div className="col-4">
                <div className="stat-box text-center">

                  <i className="bi bi-people text-success fs-2"></i>

                  <h3 className="mt-2 text-success">
                    0
                  </h3>

                  <small>Members</small>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default ProjectDetails;
