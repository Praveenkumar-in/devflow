import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="teams-card h-100"
      >
        {/* Header */}

        <div className="teams-card-header d-flex justify-content-between align-items-start mb-3">

          <div className="teams-card-icon">
            <i className="bi bi-people-fill"></i>
          </div>

        </div>

        {/* Team Name */}

        <h4 className="teams-card-title">
          {team.team_name}
        </h4>

        {/* Description */}

        <p className="teams-card-description">
          {team.description}
        </p>

        {/* Team Info */}

        <div className="teams-card-info">

          <div className="teams-card-info-item">
            <i className="bi bi-person me-2"></i>
            {team.created_by}
          </div>

          <div className="teams-card-info-item">
            <i className="bi bi-calendar-event me-2"></i>
            {team.created_at
              ? new Date(team.created_at).toLocaleDateString()
              : "N/A"}
          </div>

        </div>

        <hr className="teams-divider" />

        {/* Actions */}

        <div className="teams-card-actions d-flex justify-content-end gap-2">

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate(`/teams/${team.id}`)}
          >
            <i className="bi bi-eye"></i>
          </button>

          <button
            className="btn btn-outline-info btn-sm"
            onClick={() => onEdit(team)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(team)}
          >
            <i className="bi bi-trash"></i>
          </button>

        </div>

      </motion.div>
    </div>
  );
};

export default TeamCard;