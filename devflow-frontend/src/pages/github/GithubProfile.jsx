import React from "react";

const GithubProfile = ({ profile, onRefresh }) => {
  return (
    <div className="github-profile-card mb-4">

      <div className="row align-items-center">

        <div className="col-md-2 text-center">

          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="github-avatar"
          />

        </div>

        <div className="col-md-7">

          <h3 className="fw-bold mb-1">
            {profile.name || profile.login}
          </h3>

          <p className="text-secondary mb-2">
            @{profile.login}
          </p>

          <p className="mb-3">
            {profile.bio || "No bio available"}
          </p>

          <div className="d-flex flex-wrap gap-2">

            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              <i className="bi bi-github me-2"></i>
              View GitHub
            </a>

            <button
              className="btn btn-primary"
              onClick={onRefresh}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Refresh
            </button>

          </div>

        </div>

        <div className="col-md-3">

          <div className="row text-center">

            <div className="col-6 mb-3">
              <h4>{profile.followers}</h4>
              <small>Followers</small>
            </div>

            <div className="col-6 mb-3">
              <h4>{profile.following}</h4>
              <small>Following</small>
            </div>

            <div className="col-6">
              <h4>{profile.public_repos}</h4>
              <small>Repositories</small>
            </div>

            <div className="col-6">
              <h4>{profile.public_gists}</h4>
              <small>Gists</small>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default GithubProfile;