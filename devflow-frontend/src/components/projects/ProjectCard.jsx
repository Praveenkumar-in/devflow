// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const ProjectCard = ({ project, onEdit, onDelete }) => {
//   const navigate = useNavigate();

//   const badgeClass = {
//     Planning: "bg-warning text-dark",
//     Active: "bg-primary",
//     Completed: "bg-success",
//     "In Progress": "bg-info",
//     "On Hold": "bg-secondary",
//   };

//   return (
//     <div className="col-xl-4 col-lg-6 col-md-6 col-12">
//       <motion.div
//         whileHover={{
//           y: -8,
//           scale: 1.02,
//         }}
//         transition={{ duration: 0.3 }}
//         className="project-card h-100"
//       >
//         <div className="d-flex justify-content-between align-items-start mb-3">
//           <div className="project-icon">
//             <i className="bi bi-folder-fill"></i>
//           </div>

//           <span
//             className={`badge ${
//               badgeClass[project.status] || "bg-secondary"
//             }`}
//           >
//             {project.status}
//           </span>
//         </div>

//         <h4 className="project-title">
//           {project.title}
//         </h4>

//         <p className="project-description">
//           {project.description}
//         </p>

//         <div className="project-info">

//           <div>
//             <i className="bi bi-calendar-event me-2"></i>

//             {project.deadline
//               ? new Date(project.deadline).toLocaleDateString()
//               : "No Deadline"}
//           </div>

//           <div>
//             <i className="bi bi-person me-2"></i>

//             {project.created_by_name}
//           </div>

//         </div>

//         <hr />

//         <div className="d-flex gap-2 flex-wrap">

//           <button
//             className="btn btn-primary btn-sm flex-fill"
//             onClick={() =>
//               navigate(`/projects/${project.id}`)
//             }
//           >
//             <i className="bi bi-eye me-1"></i>

//             View
//           </button>

//           <button
//             className="btn btn-outline-info btn-sm"
//             onClick={() => onEdit(project)}
//           >
//             <i className="bi bi-pencil"></i>
//           </button>

//           <button
//             className="btn btn-outline-danger btn-sm"
//             onClick={() => onDelete(project)}
//           >
//             <i className="bi bi-trash"></i>
//           </button>

//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ProjectCard;
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const badgeClass = {
    Planning: "bg-warning text-dark",
    Active: "bg-primary",
    Completed: "bg-success",
    "On Hold": "bg-secondary",
  };

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="project-card h-100"
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="project-icon">
            <i className="bi bi-folder-fill"></i>
          </div>

          <span
            className={`badge ${
              badgeClass[project.status] || "bg-secondary"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h4 className="project-title">{project.title}</h4>

        {/* Description */}
        <p className="project-description">{project.description}</p>

        {/* Info */}
        <div className="project-info mb-4">
          <div>
            <i className="bi bi-calendar-event me-2"></i>

            {project.deadline
              ? new Date(project.deadline).toLocaleDateString()
              : "No Deadline"}
          </div>

          <div>
            <i className="bi bi-person me-2"></i>

            {project.created_by_name || "Unknown"}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex align-items-center gap-2 mt-auto">
          <button
            className="btn btn-primary flex-grow-1"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <i className="bi bi-eye me-2"></i>
            View
          </button>

          <button
            className="btn btn-outline-info"
            onClick={() => onEdit(project)}
            title="Edit"
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          <button
            className="btn btn-outline-danger"
            onClick={() => onDelete(project)}
            title="Delete"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;