import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  getBugById,
  assignBug,
  updateBugStatus,
} from "../../services/bugService";

import { getUsers } from "../../services/userService";

const BugDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bug, setBug] = useState(null);
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBug();
    fetchUsers();
  }, []);

  const fetchBug = async () => {
    try {
      setLoading(true);

      const res = await getBugById(id);

      setBug(res.bug);

      setSelectedUser(res.bug.assigned_to || "");
      setStatus(res.bug.status || "Open");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load bug"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssign = async () => {
    try {
      setSaving(true);

      await assignBug(id, selectedUser);

      toast.success("Developer assigned");

      fetchBug();
    } catch (err) {
      toast.error("Failed to assign developer");
    } finally {
      setSaving(false);
    }
  };

  const handleStatus = async () => {
    try {
      setSaving(true);

      await updateBugStatus(id, status);

      toast.success("Status updated");

      fetchBug();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

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

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate("/bugs")}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>

          <h2 className="fw-bold">
            <i className="bi bi-bug-fill text-danger me-2"></i>
            {bug.title}
          </h2>

          <p className="text-muted">
            Bug Details & Management
          </p>

        </div>

      </div>

      <div className="row g-4">

        {/* Bug Information */}

        <div className="col-lg-6">

          <div className="glass-card p-4 h-100">

            <h5 className="mb-3">
              <i className="bi bi-info-circle me-2"></i>
              Bug Information
            </h5>

            <hr />

            <p>
              <strong>Project</strong>
            </p>

            <p className="text-muted">
              {bug.project_name}
            </p>

            <p>
              <strong>Reported By</strong>
            </p>

            <p className="text-muted">
              {bug.reported_by_name}
            </p>

            <p>
              <strong>Assigned To</strong>
            </p>

            <p className="text-muted">
              {bug.assigned_to_name || "Unassigned"}
            </p>

            <p>
              <strong>Description</strong>
            </p>

            <p className="text-muted">
              {bug.description}
            </p>

            <p>
              <strong>Priority</strong>
            </p>

            <span
              className={`badge bg-${
                bug.priority === "High"
                  ? "danger"
                  : bug.priority === "Medium"
                  ? "warning"
                  : "success"
              }`}
            >
              {bug.priority}
            </span>

            <br />
            <br />

            <p>
              <strong>Status</strong>
            </p>

            <span
              className={`badge bg-${
                bug.status === "Resolved"
                  ? "success"
                  : bug.status === "Closed"
                  ? "dark"
                  : bug.status === "In Progress"
                  ? "primary"
                  : "secondary"
              }`}
            >
              {bug.status}
            </span>

          </div>

        </div>
        {/* Screenshot */}

        <div className="col-lg-6">

          <div className="glass-card p-4">

            <h5 className="mb-3">
              <i className="bi bi-image me-2"></i>
              Screenshot
            </h5>

            <hr />

            {bug.screenshot ? (

              <img
                src={bug.screenshot}
                alt={bug.title}
                className="img-fluid rounded shadow"
              />

            ) : (

              <div className="text-center py-5">

                <i
                  className="bi bi-image"
                  style={{
                    fontSize: "4rem",
                    color: "#6c757d",
                  }}
                ></i>

                <p className="text-muted mt-3 mb-0">
                  No screenshot uploaded.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* Assign Developer */}

        <div className="col-lg-6">

          <div className="glass-card p-4">

            <h5 className="mb-3">
              <i className="bi bi-person-plus me-2"></i>
              Assign Developer
            </h5>

            <div className="row g-3">

              <div className="col-md-8">

                <select
                  className="form-select"
                  value={selectedUser}
                  onChange={(e) =>
                    setSelectedUser(e.target.value)
                  }
                >

                  <option value="">
                    Select Developer
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

              <div className="col-md-4">

                <button
                  className="btn btn-primary w-100"
                  onClick={handleAssign}
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-check me-2"></i>
                      Assign
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Update Status */}

        <div className="col-lg-6">

          <div className="glass-card p-4">

            <h5 className="mb-3">
              <i className="bi bi-arrow-repeat me-2"></i>
              Update Status
            </h5>

            <div className="row g-3">

              <div className="col-md-8">

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >

                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>

                </select>

              </div>

              <div className="col-md-4">

                <button
                  className="btn btn-success w-100"
                  onClick={handleStatus}
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Update
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>
        </div>

    </motion.div>

  );

};

export default BugDetails;