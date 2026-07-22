import { useEffect, useState } from "react";
import StatCard from "../../components/cards/StatCard";
import { getDashboardStats } from "../../services/dashboardService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const Dashboard = () => {

  const [stats, setStats] = useState({
    projects: [],
    tasks: [],
    teams: [],
    bugs: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data = await getDashboardStats();

        setStats(data);

      } catch (error) {

        console.error("Dashboard Error:", error);

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

  }, []);
  const chartData = [
  {
    name: "Projects",
    total: stats.projects.length,
  },
  {
    name: "Tasks",
    total: stats.tasks.length,
  },
  {
    name: "Teams",
    total: stats.teams.length,
  },
  {
    name: "Bugs",
    total: stats.bugs.length,
  },
];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>

        <p className="text-secondary mt-3">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
  <>
    <div className="dashboard-header mb-5">
      <h2 className="text-white fw-bold">
        Welcome Back 👋
      </h2>

      <p className="text-secondary">
        Here's your workspace overview.
      </p>
    </div>

    {/* Statistics */}
    <div className="row g-4">

      <div className="col-lg-3">
        <StatCard
          title="Projects"
          value={stats.projects.length}
          subtitle="Total Projects"
          icon="bi-folder2-open"
          color="#6366F1"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Tasks"
          value={stats.tasks.length}
          subtitle="Total Tasks"
          icon="bi-list-task"
          color="#10B981"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Teams"
          value={stats.teams.length}
          subtitle="Total Teams"
          icon="bi-people"
          color="#F59E0B"
        />
      </div>

      <div className="col-lg-3">
        <StatCard
          title="Bugs"
          value={stats.bugs.length}
          subtitle="Reported Bugs"
          icon="bi-bug"
          color="#EF4444"
        />
      </div>

    </div>

    {/* Dashboard Content */}
    <div className="row mt-5">

      {/* Productivity */}
      <div className="col-lg-8 mb-4">

        <div className="dashboard-card">

          <h4 className="mb-4">
            <i className="bi bi-bar-chart-fill me-2 text-primary"></i>
            Productivity Overview
          </h4>

          <div style={{ width: "100%", height: 320 }}>

  <ResponsiveContainer>

    <BarChart data={chartData}>

      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

      <XAxis
        dataKey="name"
        stroke="#CBD5E1"
      />

      <YAxis stroke="#CBD5E1" />

      <Tooltip />

      <Bar
        dataKey="total"
        fill="#6366F1"
        radius={[8, 8, 0, 0]}
      />

    </BarChart>

  </ResponsiveContainer>

</div>

        </div>

      </div>

      {/* Activity */}
      <div className="col-lg-4 mb-4">

        <div className="dashboard-card">

          <h4 className="mb-4">
            <i className="bi bi-clock-history me-2 text-warning"></i>
            Recent Activity
          </h4>

          <div className="activity-list">

            <div className="activity-item">
              <i className="bi bi-folder-check text-primary"></i>

              <div>
                <strong>{stats.projects.length}</strong>
                <small className="d-block text-secondary">
                  Total Projects
                </small>
              </div>
            </div>

            <div className="activity-item mt-3">
              <i className="bi bi-check2-square text-success"></i>

              <div>
                <strong>{stats.tasks.length}</strong>
                <small className="d-block text-secondary">
                  Total Tasks
                </small>
              </div>
            </div>

            <div className="activity-item mt-3">
              <i className="bi bi-people-fill text-warning"></i>

              <div>
                <strong>{stats.teams.length}</strong>
                <small className="d-block text-secondary">
                  Total Teams
                </small>
              </div>
            </div>

            <div className="activity-item mt-3">
              <i className="bi bi-bug-fill text-danger"></i>

              <div>
                <strong>{stats.bugs.length}</strong>
                <small className="d-block text-secondary">
                  Total Bugs
                </small>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>

  </>
);
};

export default Dashboard;