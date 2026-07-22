import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  getTeamById,
  getTeamMembers,
  addMember,
  removeMember,
} from "../../services/teamService";

import { getUsers } from "../../services/userService";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const fetchTeam = async () => {
    try {
      setLoading(true);

      const [teamRes, membersRes, usersRes] = await Promise.all([
        getTeamById(id),
        getTeamMembers(id),
        getUsers(),
      ]);

      setTeam(teamRes.data.team);
      setMembers(membersRes.data.members || []);
      setUsers(usersRes.data.users || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load team"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [id]);

  const handleAddMember = async () => {
    if (!selectedUser) {
      return toast.error("Select a user");
    }

    try {
      setAdding(true);

      await addMember(id, {
        user_id: selectedUser,
      });

      toast.success("Member added");

      setSelectedUser("");

      fetchTeam();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add member"
      );
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeMember(id, userId);

      toast.success("Member removed");

      fetchTeam();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove member"
      );
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => navigate("/teams")}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>

          <h2 className="fw-bold">
            <i className="bi bi-people-fill text-primary me-2"></i>
            {team?.team_name}
          </h2>

          <p className="text-muted">
            Team Details & Member Management
          </p>

        </div>

      </div>

      <div className="row g-4">

        {/* Team Info */}

        <div className="col-lg-5">

          <div className="glass-card p-4 h-100">

            <h5 className="mb-3">
              <i className="bi bi-info-circle me-2"></i>
              Team Information
            </h5>

            <hr />

            <p>
              <strong>Name</strong>
            </p>

            <p className="text-muted">
              {team?.team_name}
            </p>

            <p>
              <strong>Description</strong>
            </p>

            <p className="text-muted">
              {team?.description || "No description"}
            </p>

            <p>
              <strong>Created By</strong>
            </p>

            <p className="text-muted">
              {team?.created_by}
            </p>

            <p>
              <strong>Created At</strong>
            </p>

            <p className="text-muted">
              {new Date(team?.created_at).toLocaleDateString()}
            </p>

          </div>

        </div>

        {/* Add Member */}

        <div className="col-lg-7">

          <div className="glass-card p-4">

            <h5 className="mb-3">
              <i className="bi bi-person-plus-fill me-2"></i>
              Add Team Member
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
                    Select User
                  </option>

                  {users.map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.full_name} ({user.email})
                    </option>
                  ))}

                </select>

              </div>

              <div className="col-md-4">

                <button
                  className="btn btn-primary w-100"
                  onClick={handleAddMember}
                  disabled={adding}
                >
                  {adding ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>
                      Add Member
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>

     

      </div>
      {/* Members */}

        <div className="col-12">

          <div className="glass-card p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h5 className="mb-0">
                <i className="bi bi-people me-2"></i>
                Team Members
              </h5>

              <span className="badge bg-primary">
                {members.length} Member{members.length !== 1 ? "s" : ""}
              </span>

            </div>

            {members.length === 0 ? (

              <div className="text-center py-5">

                <i
                  className="bi bi-people"
                  style={{
                    fontSize: "4rem",
                    color: "#6c757d",
                  }}
                ></i>

                <h5 className="mt-3">
                  No Members Yet
                </h5>

                <p className="text-muted mb-0">
                  Add your first member to this team.
                </p>

              </div>

            ) : (

              <div className="row g-3">

                {members.map((member) => (

                  <div
                    key={member.id}
                    className="col-lg-6"
                  >

                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass-card p-3 h-100"
                    >

                      <div className="d-flex justify-content-between align-items-start">

                        <div>

                          <h6 className="fw-bold mb-1">
                            <i className="bi bi-person-circle me-2 text-primary"></i>
                            {member.full_name}
                          </h6>

                          <p className="text-muted mb-1">
                            {member.email}
                          </p>

                          {member.role && (
                            <span className="badge bg-secondary">
                              {member.role}
                            </span>
                          )}

                        </div>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            handleRemoveMember(member.id)
                          }
                        >
                          <i className="bi bi-person-dash"></i>
                        </button>

                      </div>

                    </motion.div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default TeamDetails;