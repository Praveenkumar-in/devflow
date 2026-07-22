import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  loginGithub,
  getGithubProfile,
  getGithubRepositories,
} from "../../services/githubService";

import GithubProfile from "./GithubProfile";
import GithubStats from "./GithubStats";
import RepositoryCard from "./RepositoryCard";

const Github = () => {
  const [searchParams] = useSearchParams();

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

      setProfile(profileRes?.githubProfile || null);
      setRepositories(repoRes?.repositories || []);
      setFilteredRepos(repoRes?.repositories || []);
    } catch (error) {
      console.error(error);
      setProfile(null);
      setRepositories([]);
      setFilteredRepos([]);
      toast.error("Failed to load GitHub data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get("connected") === "true") {
      toast.success("GitHub Connected Successfully 🎉");
    }

    if (searchParams.get("connected") === "false") {
      toast.error("GitHub Connection Failed");
    }

    loadGithubData();
  }, [searchParams]);

  useEffect(() => {
    const filtered = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRepos(filtered);
  }, [search, repositories]);

  const handleRefresh = async () => {
    toast.loading("Refreshing GitHub...", { id: "github" });
    await loadGithubData();
    toast.success("Repositories Updated", { id: "github" });
  };

  if (loading) {
    return (
      <div className="container-fluid py-4 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3 text-muted">Loading GitHub data...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-github me-2"></i>
            GitHub Integration
          </h2>
          <p className="text-muted mb-0">
            Connect GitHub and manage your repositories.
          </p>
        </div>

        {profile ? (
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={handleRefresh}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </button>
        ) : (
          <button
            className="btn btn-dark rounded-pill px-4"
            onClick={loginGithub}
          >
            <i className="bi bi-github me-2"></i>
            Connect GitHub
          </button>
        )}
      </div>

      {/* Not Connected */}
      {!profile ? (
        <div className="github-connect-card text-center">
          <i className="bi bi-github" style={{ fontSize: "90px" }}></i>
          <h2 className="mt-4 fw-bold">Connect your GitHub Account</h2>
          <p className="text-secondary mt-3">
            Connect GitHub to view your profile, repositories and use AI
            repository analysis.
          </p>
          <button
            className="btn btn-dark btn-lg mt-4 px-5"
            onClick={loginGithub}
          >
            <i className="bi bi-github me-2"></i>
            Connect GitHub
          </button>
        </div>
      ) : (
        <>
          {/* Profile */}
          <GithubProfile profile={profile} onRefresh={handleRefresh} />

          {/* Stats */}
          <GithubStats profile={profile} />

          {/* ================= GitHub Analytics ================= */}
          <div className="row mt-4">
            {/* Contribution Calendar */}
            <div className="col-lg-8 mb-4">
              <div className="github-glass-card">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-calendar3 text-success fs-3 me-2"></i>
                  <h4 className="fw-bold mb-0">Contribution Calendar</h4>
                </div>
                <img
                  src={`https://ghchart.rshah.org/40916c/${profile.login}`}
                  alt="Contribution Calendar"
                  className="img-fluid contribution-img"
                />
              </div>
            </div>

            {/* Streak */}
            <div className="col-lg-4 mb-4">
              <div className="github-glass-card">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-fire text-danger fs-3 me-2"></i>
                  <h4 className="fw-bold mb-0">Current Streak</h4>
                </div>
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${profile.login}&theme=github-dark&hide_border=true`}
                  alt="GitHub Streak"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          {/* ================= End Analytics ================= */}

          {/* Search */}
          <div className="github-search mt-4 mb-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search repositories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Repository Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Repositories</h4>
            <span className="badge bg-primary fs-6">
              {filteredRepos.length}
            </span>
          </div>

          {/* Repository Grid */}
          <div className="row">
            {filteredRepos.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-warning text-center">
                  <i className="bi bi-search me-2"></i>
                  No repositories found.
                </div>
              </div>
            ) : (
              filteredRepos.map((repo) => (
                <div className="col-lg-4 col-md-6 mb-4" key={repo.id}>
                  <RepositoryCard repo={repo} />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Github;
