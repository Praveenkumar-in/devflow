import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import NotificationCard from "./NotificationCard";
import CreateNotificationModal from "./CreateNotificationModal";
import DeleteNotificationModal from "./DeleteNotificationModal";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../../services/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await getNotifications();

      setNotifications(res.notifications || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);

      toast.success("Notification marked as read");

      fetchNotifications();
    } catch (err) {
      toast.error("Failed to update notification");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNotification(selectedNotification.id);

      toast.success("Notification deleted");

      setShowDelete(false);
      setSelectedNotification(null);

      fetchNotifications();
    } catch (err) {
      toast.error("Failed to delete notification");
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Read"
          ? notification.is_read
          : !notification.is_read;

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
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

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>
          <h2 className="fw-bold">
            <i className="bi bi-bell-fill text-warning me-2"></i>
            Notifications
          </h2>

          <p className="text-muted mb-0">
            View and manage your notifications
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowCreate(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          New Notification
        </button>

      </div>

      {/* Filters */}

      <div className="glass-card p-3 mb-4">

        <div className="row g-3">

          <div className="col-md-8">

            <input
              type="text"
              className="form-control"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Read</option>
              <option>Unread</option>
            </select>

          </div>

        </div>

      </div>
      {/* Notifications List */}

      {filteredNotifications.length === 0 ? (

        <div className="glass-card text-center py-5">

          <i
            className="bi bi-bell-slash"
            style={{
              fontSize: "4rem",
              color: "#6c757d",
            }}
          ></i>

          <h4 className="mt-3">
            No Notifications Found
          </h4>

          <p className="text-muted">
            Try changing your search or create a new notification.
          </p>

        </div>

      ) : (

        <div className="row g-4">

          {filteredNotifications.map((notification) => (

            <div
              className="col-lg-6 col-xl-4"
              key={notification.id}
            >

              <NotificationCard
                notification={notification}
                onRead={handleMarkRead}
                onDelete={(notification) => {
                  setSelectedNotification(notification);
                  setShowDelete(true);
                }}
              />

            </div>

          ))}

        </div>

      )}

      {/* Create Notification Modal */}

      <CreateNotificationModal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        onSuccess={() => {
          setShowCreate(false);
          fetchNotifications();
        }}
      />

      {/* Delete Notification Modal */}

      <DeleteNotificationModal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
          setSelectedNotification(null);
        }}
        notification={selectedNotification}
        onConfirm={handleDelete}
      /></motion.div>
  );
};

export default Notifications;