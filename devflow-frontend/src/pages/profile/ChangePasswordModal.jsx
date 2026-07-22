import { useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

import { changePassword } from "../../services/profileService";

const ChangePasswordModal = ({
  show,
  onHide,
}) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.oldPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      return toast.error("Please fill all fields.");
    }

    if (
      form.newPassword !== form.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {
      setLoading(true);

      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password changed successfully");

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      onHide();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to change password"
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
      className="profile-modal"
    >
      <form onSubmit={handleSubmit}>

        <Modal.Header closeButton>

          <Modal.Title>
            <i className="bi bi-key me-2"></i>
            Change Password
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <div className="mb-3">

            <label className="form-label">
              Current Password
            </label>

            <input
              type="password"
              className="form-control"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              New Password
            </label>

            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />

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
            className="btn btn-warning"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Updating...
              </>
            ) : (
              <>
                <i className="bi bi-shield-lock me-2"></i>
                Change Password
              </>
            )}
          </button>

        </Modal.Footer>

      </form>

    </Modal>
  );
};

export default ChangePasswordModal;