import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { getProjects } from "../../services/projectService";
import CreateProjectModal from "./CreateProjectModal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await getProjects();

      console.log("Projects API:", res.data);

      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="text-white fw-bold">Projects</h2>

            <p className="text-secondary">
              Manage all your projects
            </p>
          </div>

          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createProjectModal"
          >
            <i className="bi bi-plus-circle me-2"></i>
            New Project
          </button>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-info"></div>
          </div>
        ) : projects.length === 0 ? (

          <div className="glass-card p-5 text-center">

            <i className="bi bi-folder2-open display-1 text-secondary"></i>

            <h3 className="text-white mt-3">
              No Projects Found
            </h3>

            <p className="text-secondary">
              Click "New Project" to create your first project.
            </p>

          </div>

        ) : (

          <div className="row">

            {projects.map((project) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={project.id}
              >

                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-4 h-100"
                >

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <i className="bi bi-folder-fill fs-2 text-info"></i>

                    <span
                      className={`badge ${
                        project.status === "Completed"
                          ? "bg-success"
                          : project.status === "Active"
                          ? "bg-primary"
                          : project.status === "Planning"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {project.status}
                    </span>

                  </div>

                  <h4 className="text-white">
                    {project.title}
                  </h4>

                  <p className="text-secondary">
                    {project.description}
                  </p>

                  {project.deadline && (
                    <p className="text-info small">
                      <i className="bi bi-calendar-event me-2"></i>
                      Deadline:{" "}
                      {new Date(project.deadline).toLocaleDateString()}
                    </p>
                  )}

                  <hr />

                  <div className="d-flex justify-content-between">

                    <button className="btn btn-outline-info btn-sm">
                      <i className="bi bi-pencil-square me-1"></i>
                      Edit
                    </button>

                    <button className="btn btn-outline-danger btn-sm">
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </button>

                  </div>

                </motion.div>

              </div>

            ))}

          </div>

        )}

      </motion.div>

      {/* Create Project Modal */}
      <CreateProjectModal onSuccess={fetchProjects} />
    </>
  );
};

export default Projects;