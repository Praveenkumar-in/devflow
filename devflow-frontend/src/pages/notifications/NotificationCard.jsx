import { motion } from "framer-motion";

const NotificationCard = ({
  notification,
  onRead,
  onDelete,
}) => {
  return (
    <motion.div
      className={`glass-card notification-card ${
        !notification.is_read ? "notification-unread" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="d-flex justify-content-between align-items-start mb-3">

        <div className="flex-grow-1">

          <h5 className="notification-title mb-1">
            <i className="bi bi-bell-fill text-warning me-2"></i>
            {notification.title}
          </h5>

          <small className="text-muted">
            {new Date(
              notification.created_at
            ).toLocaleString()}
          </small>

        </div>

        <span
          className={`badge ${
            notification.is_read
              ? "bg-success"
              : "bg-danger"
          }`}
        >
          {notification.is_read
            ? "Read"
            : "Unread"}
        </span>

      </div>

      <p className="notification-message">
        {notification.message}
      </p>

      <div className="d-flex gap-2 mt-4">

        {!notification.is_read && (
          <button
            className="btn btn-success btn-sm flex-fill"
            onClick={() => onRead(notification.id)}
          >
            <i className="bi bi-check-circle me-2"></i>
            Mark Read
          </button>
        )}

        <button
          className="btn btn-outline-danger btn-sm flex-fill"
          onClick={() => onDelete(notification)}
        >
          <i className="bi bi-trash me-2"></i>
          Delete
        </button>

      </div>
    </motion.div>
  );
};

export default NotificationCard;