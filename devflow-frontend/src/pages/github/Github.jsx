import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  loginGithub,
  getGithubProfile,
  getGithubRepositories,
} from "../../services/githubService";

const Github = () => {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadGithubData = async () => {
    try {
      setLoading(true);

      const profileRes = await getGithubProfile();
      const repoRes = await getGithubRepositories();

      setProfile(profileRes.githubProfile);
      setRepositories(repoRes.repositories);
      setFilteredRepos(repoRes.repositories);
    } catch (err) {
      console.log(err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGithubData();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredRepos(filtered);
  }, [search, repositories]);

  const handleRefresh = () => {
    toast.loading("Refreshing GitHub...", {
      id: "github",
    });

    loadGithubData();

    toast.success("GitHub Updated", {
      id: "github",
    });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          <i className="bi bi-github me-2"></i>
          GitHub Integration
        </h2>

        {profile ? (
          <button
            className="btn btn-outline-primary"
            onClick={handleRefresh}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </button>
        ) : (
          <button
            className="btn btn-dark"
            onClick={loginGithub}
          >
            <i className="bi bi-github me-2"></i>
            Connect GitHub
          </button>
        )}

      </div>

      {!profile ? (
        <div className="card shadow-sm border-0 p-5 text-center">

          <i
            className="bi bi-github"
            style={{ fontSize: "70px" }}
          ></i>

          <h3 className="mt-4">
            Connect your GitHub Account
          </h3>

          <p className="text-muted">
            Access repositories and integrate GitHub with DevFlow.
          </p>

          <div className="mt-3">
            <button
              className="btn btn-dark btn-lg"
              onClick={loginGithub}
            >
              <i className="bi bi-github me-2"></i>
              Connect GitHub
            </button>
          </div>

        </div>
      ) : (
        <>
          {/* Profile Card Placeholder */}
          <div className="card shadow-sm border-0 mb-4">

            <div className="card-body d-flex align-items-center">

              <img
                src={profile.avatar_url}
                alt={profile.login}
                className="rounded-circle"
                width="90"
              />

              <div className="ms-4">

                <h3>{profile.name}</h3>

                <p className="text-muted mb-1">
                  @{profile.login}
                </p>

                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark btn-sm mt-2"
                >
                  View GitHub
                </a>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="mb-4">

            <input
              className="form-control"
              placeholder="Search Repository..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* Repository List */}

          <div className="row">

            {filteredRepos.map((repo) => (
              <div
                className="col-lg-4 mb-4"
                key={repo.id}
              >
                <div className="card h-100 shadow-sm border-0">

                  <div className="card-body">

                    <h5>{repo.name}</h5>

                    <p className="text-muted small">
                      {repo.description || "No description"}
                    </p>

                    <div className="mb-2">

                      <span className="badge bg-primary me-2">
                        {repo.language || "Unknown"}
                      </span>

                      <span className="badge bg-warning text-dark me-2">
                        ⭐ {repo.stargazers_count}
                      </span>

                      <span className="badge bg-success">
                        🍴 {repo.forks_count}
                      </span>

                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-dark mt-3"
                    >
                      Open Repository
                    </a>

                  </div>

                </div>
              </div>
            ))}

          </div>
        </>
      )}
    </div>
  );
};

export default Github;