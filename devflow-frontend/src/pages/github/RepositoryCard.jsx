import React from "react";

const RepositoryCard = ({ repo }) => {

  const updatedDate = new Date(repo.updated_at).toLocaleDateString();

  return (
    <div className="repository-card h-100">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-start mb-3">

        <div>

          <h5 className="fw-bold mb-1">

            <i className="bi bi-folder-fill text-warning me-2"></i>

            {repo.name}

          </h5>

          <small className="text-secondary">

            {repo.private ? (
              <span className="badge bg-danger">
                Private
              </span>
            ) : (
              <span className="badge bg-success">
                Public
              </span>
            )}

          </small>

        </div>

      </div>

      {/* Description */}

      <p className="repo-description">

        {repo.description || "No description available."}

      </p>

      {/* Language */}

      <div className="mb-3">

        <span className="badge bg-primary">

          {repo.language || "Unknown"}

        </span>

      </div>

      {/* Stats */}

      <div className="d-flex justify-content-between mb-3">

        <span>

          ⭐ {repo.stargazers_count}

        </span>

        <span>

          🍴 {repo.forks_count}

        </span>

        <span>

          👀 {repo.watchers_count}

        </span>

      </div>

      {/* Updated */}

      <p className="repo-update">

        <i className="bi bi-clock-history me-2"></i>

        Updated {updatedDate}

      </p>

      {/* Footer */}

      <div className="d-grid mt-4">

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-dark"
        >

          <i className="bi bi-box-arrow-up-right me-2"></i>

          Open Repository

        </a>

      </div>

    </div>
  );
};

export default RepositoryCard;
