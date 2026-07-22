import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { getProjects } from "../../services/projectService";

import CreateProjectModal from "./CreateProjectModal";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

import ProjectCard from "../../components/projects/ProjectCard";





const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await getProjects();

      setProjects(res.data.projects || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project) => {
    setSelectedProject(project);

    const modal = new window.bootstrap.Modal(
      document.getElementById("editProjectModal")
    );

    modal.show();
  };

  const handleDelete = (project) => {
    setSelectedProject(project);

    const modal = new window.bootstrap.Modal(
      document.getElementById("deleteProjectModal")
    );

    modal.show();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}

        <div className="projects-header">

          <div>
            <h2>Projects</h2>
            <p>Manage all your projects</p>
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
          <div className="text-center py-5">
            <div className="spinner-border text-info"></div>
          </div>
        ) : projects.length === 0 ? (

          <div className="project-empty">

            <i className="bi bi-folder2-open display-1"></i>

            <h3 className="mt-3">
              No Projects Found
            </h3>

            <p>
              Create your first project.
            </p>

          </div>

        ) : (

          <div className="row g-4">

            {projects.map((project) => (

              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </motion.div>

      {/* Create */}

      <CreateProjectModal
        onSuccess={fetchProjects}
      />

      {/* Edit */}

      <EditProjectModal
        project={selectedProject}
        onSuccess={fetchProjects}
      />

      {/* Delete */}

      <DeleteProjectModal
        project={selectedProject}
        onSuccess={fetchProjects}
      />
    </>
  );
};

export default Projects;