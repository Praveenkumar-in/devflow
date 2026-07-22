import { useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

import { uploadProfile } from "../../services/profileService";

const UploadProfileModal = ({
  show,
  onHide,
  onSuccess,
}) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Please select an image.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("profile", image);

      await uploadProfile(formData);

      toast.success("Profile picture uploaded successfully");

      setImage(null);
      setPreview("");

      onSuccess();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to upload profile picture"
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
            <i className="bi bi-camera me-2"></i>
            Upload Profile Picture
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <div className="mb-3">

            <label className="form-label">
              Choose Image
            </label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />

          </div>

          {preview && (

            <div className="text-center">

              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded shadow"
                style={{
                  maxHeight: "250px",
                  objectFit: "cover",
                }}
              />

            </div>

          )}
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
                Uploading...
              </>
            ) : (
              <>
                <i className="bi bi-upload me-2"></i>
                Upload
              </>
            )}
          </button>

        </Modal.Footer>

      </form>

    </Modal>
  );
};

export default UploadProfileModal;