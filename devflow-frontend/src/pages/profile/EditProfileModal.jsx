import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

import { updateProfile } from "../../services/profileService";

const EditProfileModal = ({
  show,
  onHide,
  profile,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.full_name || !form.email) {
      return toast.error("Please fill all fields.");
    }

    try {
      setLoading(true);

      await updateProfile(form);

      toast.success("Profile updated successfully");

      onSuccess();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update profile"
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
            <i className="bi bi-pencil-square me-2"></i>
            Edit Profile
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <div className="mb-3">

            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Enter full name"
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
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
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Updating...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Update Profile
              </>
            )}
          </button>

        </Modal.Footer>

      </form>

    </Modal>
  );
};

export default EditProfileModal;