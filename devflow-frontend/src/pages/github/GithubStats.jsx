import React from "react";

const GithubStats = ({ profile }) => {
  const stats = [
    {
      icon: "bi-folder2-open",
      title: "Repositories",
      value: profile.public_repos,
      color: "primary",
    },
    {
      icon: "bi-people-fill",
      title: "Followers",
      value: profile.followers,
      color: "success",
    },
    {
      icon: "bi-person-plus-fill",
      title: "Following",
      value: profile.following,
      color: "warning",
    },
    {
      icon: "bi-journal-code",
      title: "Public Gists",
      value: profile.public_gists,
      color: "danger",
    },
  ];

  return (
    <div className="row g-4 mb-4">

      {stats.map((stat, index) => (

        <div
          className="col-lg-3 col-md-6"
          key={index}
        >

          <div className="github-stat-card">

            <div className={`stat-icon bg-${stat.color}`}>

              <i className={`bi ${stat.icon}`}></i>

            </div>

            <h2>{stat.value}</h2>

            <p>{stat.title}</p>

          </div>

        </div>

      ))}

    </div>
  );
};

export default GithubStats;