import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  getTeams,
  deleteTeam,
} from "../../services/teamService";

import TeamCard from "../../components/teams/TeamCard";

import CreateTeamModal from "./CreateTeamModal";
import EditTeamModal from "./EditTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";



const Teams = () => {

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTeam, setSelectedTeam] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const fetchTeams = async () => {

    try {

      setLoading(true);

      const res = await getTeams();

      setTeams(res.data.teams || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load teams"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleEdit = (team) => {

    setSelectedTeam(team);

    setShowEdit(true);

  };

  const handleDelete = (team) => {

    setSelectedTeam(team);

    setShowDelete(true);

  };

  const confirmDelete = async () => {

    try {

      await deleteTeam(selectedTeam.id);

      toast.success("Team deleted successfully");

      setShowDelete(false);

      fetchTeams();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };
  return (
   
    <motion.div
      className="container-fluid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}

      <div className="teams-header d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="teams-title">
            <i className="bi bi-people-fill me-2 text-primary"></i>
            Teams
          </h2>

          <p className="teams-subtitle">
            Manage your development teams.
          </p>

        </div>

        <button
          className="btn teams-create-btn "
          onClick={() => setShowCreate(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          New Team
        </button>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="text-center py-5">

          <div className="spinner-border text-primary"></div>

        </div>

      ) : teams.length === 0 ? (

         <div className="team-empty glass-card">

          <i
            className="bi bi-people"
            style={{
              fontSize: "4rem",
              color: "#6c63ff",
            }}
          ></i>

          <h4 className="mt-3">
            No Teams Found
          </h4>

          <p className="text-muted">
            Create your first development team.
          </p>

          <button
  className="btn btn-primary teams-create-btn"
  onClick={() => setShowCreate(true)}
>
  <i className="bi bi-plus-circle me-2"></i>
  New Team
</button>

        </div>

      ) : (

        <div className="row g-4 teams-grid">

          {teams.map((team) => (

            <TeamCard
              key={team.id}
              team={team}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

      {/* Modals */}

      <CreateTeamModal
        show={showCreate}
        handleClose={() => setShowCreate(false)}
        refreshTeams={fetchTeams}
      />

      <EditTeamModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        team={selectedTeam}
        refreshTeams={fetchTeams}
      />

      <DeleteTeamModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
        team={selectedTeam}
      />

    </motion.div>
  );
};

export default Teams;