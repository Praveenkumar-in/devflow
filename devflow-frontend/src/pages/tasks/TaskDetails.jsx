import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getTaskById } from "../../services/taskService";



const TaskDetails = () => {

  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {

    try {

      setLoading(true);

      const res = await getTaskById(id);

      setTask(res.data.task);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load task"
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="alert alert-danger">
        Task not found.
      </div>
    );
  }
  return (
    <motion.div
      className="container-fluid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <Link
            to="/tasks"
            className="btn btn-outline-primary mb-3"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Tasks
          </Link>

          <h2 className="fw-bold">
            <i className="bi bi-list-task me-2 text-primary"></i>
            {task.title}
          </h2>

        </div>

      </div>

      <div className="row g-4">

        {/* Left Side */}

        <div className="col-lg-8">

          <div className="glass-card p-4">

            <h5 className="mb-3">
              Description
            </h5>

            <p className="text-muted mb-0">
              {task.description}
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="col-lg-4">

          <div className="info-card">

            <h5 className="mb-4">
              Task Information
            </h5>

            <div className="info-item">

              <div className="info-icon">
                <i className="bi bi-folder"></i>
              </div>

              <div className="info-content">
                <small>Project</small>
                <strong>
                  {task.project_name || "N/A"}
                </strong>
              </div>

            </div>

            <div className="info-item">

              <div className="info-icon">
                <i className="bi bi-person"></i>
              </div>

              <div className="info-content">
                <small>Assigned To</small>
                <strong>
                  {task.assigned_to_name || "N/A"}
                </strong>
              </div>

            </div>

            <div className="info-item">

              <div className="info-icon">
                <i className="bi bi-flag"></i>
              </div>

              <div className="info-content">
                <small>Priority</small>
                <span className="badge bg-danger">
                  {task.priority}
                </span>
              </div>

            </div>

            <div className="info-item">

              <div className="info-icon">
                <i className="bi bi-check-circle"></i>
              </div>

              <div className="info-content">
                <small>Status</small>
                <span className="badge bg-primary">
                  {task.status}
                </span>
              </div>

            </div>

            <div className="info-item">

              <div className="info-icon">
                <i className="bi bi-calendar-event"></i>
              </div>

              <div className="info-content">
                <small>Due Date</small>
                <strong>
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : "N/A"}
                </strong>
              </div>

            </div>

            <div className="info-item">

              <div className="info-icon">
                <i className="bi bi-clock-history"></i>
              </div>

              <div className="info-content">
                <small>Created</small>
                <strong>
                  {task.created_at
                    ? new Date(task.created_at).toLocaleDateString()
                    : "N/A"}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default TaskDetails;