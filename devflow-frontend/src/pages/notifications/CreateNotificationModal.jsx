import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

import { createNotification } from "../../services/notificationService";
import { getUsers } from "../../services/userService";

const CreateNotificationModal = ({
  show,
  onHide,
  onSuccess,
}) => {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchUsers();
    }
  }, [show]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.user_id ||
      !form.title ||
      !form.message
    ) {
      return toast.error("Please fill all fields.");
    }

    try {
      setLoading(true);

      await createNotification(form);

      toast.success("Notification created successfully");

      setForm({
        user_id: "",
        title: "",
        message: "",
      });

      onSuccess();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create notification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="notification-modal"
    >
      <form onSubmit={handleSubmit}>

        <Modal.Header closeButton>

          <Modal.Title>
            <i className="bi bi-bell-fill text-warning me-2"></i>
            Create Notification
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <div className="mb-3">

            <label className="form-label">
              User
            </label>

            <select
              className="form-select"
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
            >
              <option value="">
                Select User
              </option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.full_name}
                </option>
              ))}

            </select>

          </div>

          <div className="mb-3">

            <label className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Notification title"
            />

          </div>
          <div className="mb-3">

            <label className="form-label">
              Message
            </label>

            <textarea
              className="form-control"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter notification message"
            ></textarea>

          </div>

        </Modal.Body>

        <Modal.Footer>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onHide}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Create Notification
              </>
            )}
          </button>

        </Modal.Footer>

      </form>

    </Modal>
  );
};

export default CreateNotificationModal;