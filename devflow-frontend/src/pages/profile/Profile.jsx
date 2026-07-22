import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getProfile } from "../../services/profileService";

import EditProfileModal from "./EditProfileModal";
import UploadProfileModal from "./UploadProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      setProfile(res.user);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load profile."
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

  if (!profile) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No profile data available.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container-fluid  profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">
            <i className="bi bi-person-circle me-2 text-primary"></i>
            My Profile
          </h2>
          <p className="text-muted">Manage your account information</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-lg-4">
          <div className="glass-card text-center p-4 h-100">
            <img
              src={profile.profile_image || "https://via.placeholder.com/180"}
              alt={profile.full_name || "Profile"}
              className="profile-avatar mb-3"
            />
            <h4 className="fw-bold">{profile.full_name}</h4>
            <p className="text-muted">{profile.role}</p>
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => setShowUpload(true)}
            >
              <i className="bi bi-camera me-2"></i>
              Upload Photo
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="col-lg-8">
          <div className="glass-card p-4">
            <h4 className="mb-4">
              <i className="bi bi-info-circle me-2"></i>
              Personal Information
            </h4>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">Full Name</label>
                <div className="profile-info">
                  <i className="bi bi-person me-2 text-primary"></i>
                  {profile.full_name}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">Email</label>
                <div className="profile-info">
                  <i className="bi bi-envelope me-2 text-success"></i>
                  {profile.email}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">Role</label>
                <div className="profile-info">
                  <i className="bi bi-shield-check me-2 text-warning"></i>
                  {profile.role}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">Joined</label>
                <div className="profile-info">
                  <i className="bi bi-calendar-event me-2 text-info"></i>
                  {new Date(profile.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <hr />

            <div className="d-flex flex-wrap gap-3 mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowEdit(true)}
              >
                <i className="bi bi-pencil-square me-2"></i>
                Edit Profile
              </button>

              <button
                className="btn btn-warning"
                onClick={() => setShowPassword(true)}
              >
                <i className="bi bi-key me-2"></i>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        profile={profile}
        onSuccess={() => {
          setShowEdit(false);
          fetchProfile();
        }}
      />

      <UploadProfileModal
        show={showUpload}
        onHide={() => setShowUpload(false)}
        onSuccess={() => {
          setShowUpload(false);
          fetchProfile();
        }}
      />

      <ChangePasswordModal
        show={showPassword}
        onHide={() => setShowPassword(false)}
      />
    </motion.div>
  );
};

export default Profile;
