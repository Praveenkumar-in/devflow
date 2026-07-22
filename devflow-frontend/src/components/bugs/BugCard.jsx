import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BugCard = ({ bug, onEdit, onDelete }) => {
  const priorityClass = {
    High: "danger",
    Medium: "warning",
    Low: "success",
  };

  const statusClass = {
    Open: "secondary",
    "In Progress": "primary",
    Resolved: "success",
    Closed: "dark",
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bug-card h-100"
    >
      <div className="bug-card-header">

        <div>

          <h5 className="bug-title">
            <i className="bi bi-bug-fill text-danger me-2"></i>
            {bug.title}
          </h5>

          <small className="text-muted">
            {bug.project_name}
          </small>

        </div>

        <span
          className={`badge bg-${priorityClass[bug.priority] || "secondary"}`}
        >
          {bug.priority}
        </span>

      </div>

      <p className="bug-description">
        {bug.description?.length > 120
          ? bug.description.substring(0, 120) + "..."
          : bug.description}
      </p>

      {bug.screenshot && (
        <div className="bug-image-wrapper">

          <img
            src={bug.screenshot}
            alt={bug.title}
            className="bug-image"
          />

        </div>
      )}

      <div className="bug-info">

        <div>
          <i className="bi bi-person-fill me-2"></i>
          {bug.assigned_to_name || "Unassigned"}
        </div>

        <span
          className={`badge bg-${statusClass[bug.status] || "secondary"}`}
        >
          {bug.status}
        </span>

      </div>

      <hr />

      <div className="bug-actions">

        <Link
          to={`/bugs/${bug.id}`}
          className="btn btn-outline-primary btn-sm"
        >
          <i className="bi bi-eye me-1"></i>
          View
        </Link>

        <button
          className="btn btn-outline-warning btn-sm"
          onClick={() => onEdit(bug)}
        >
          <i className="bi bi-pencil-square me-1"></i>
          Edit
        </button>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDelete(bug)}
        >
          <i className="bi bi-trash me-1"></i>
          Delete
        </button>

      </div>

    </motion.div>
  );
};

export default BugCard;