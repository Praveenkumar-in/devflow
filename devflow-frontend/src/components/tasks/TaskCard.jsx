import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const priorityBadge = {
    High: "bg-danger",
    Medium: "bg-warning text-dark",
    Low: "bg-success",
  };

  const statusBadge = {
    Pending: "bg-secondary",
    "In Progress": "bg-primary",
    Completed: "bg-success",
  };

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}
        className="task-card h-100"
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">

          <div className="task-icon">
            <i className="bi bi-list-task"></i>
          </div>

          <span
            className={`badge ${
              priorityBadge[task.priority] || "bg-secondary"
            }`}
          >
            {task.priority}
          </span>

        </div>

        {/* Title */}

        <h4 className="task-title">
          {task.title}
        </h4>

        {/* Description */}

        <p className="task-description">
          {task.description}
        </p>

        {/* Information */}

        <div className="task-info">

          <div>
            <i className="bi bi-folder me-2 text-info"></i>
            {task.project_name}
          </div>

          <div>
            <i className="bi bi-person me-2 text-info"></i>
            {task.assigned_to_name}
          </div>

          <div>
            <i className="bi bi-calendar-event me-2 text-info"></i>

            {task.due_date
              ? new Date(task.due_date).toLocaleDateString()
              : "No Due Date"}
          </div>

        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center">

          <span
            className={`badge ${
              statusBadge[task.status] || "bg-secondary"
            }`}
          >
            {task.status}
          </span>

          <div className="d-flex gap-2">

            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <i className="bi bi-eye"></i>
            </button>

            <button
              className="btn btn-outline-info btn-sm"
              onClick={() => onEdit(task)}
            >
              <i className="bi bi-pencil-square"></i>
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(task)}
            >
              <i className="bi bi-trash"></i>
            </button>

          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default TaskCard;