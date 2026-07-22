import axios from "axios";

const API = "https://devflow-x25w.onrender.com/api";

const token = localStorage.getItem("token");

const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getDashboardStats = async () => {
  const [projects, tasks, teams, bugs] = await Promise.all([
    axios.get(`${API}/projects`, auth),
    axios.get(`${API}/tasks`, auth),
    axios.get(`${API}/teams`, auth),
    axios.get(`${API}/bugs`, auth),
  ]);

  return {
    projects: projects.data.projects || [],
    tasks: tasks.data.tasks || [],
    teams: teams.data.teams || [],
    bugs: bugs.data.bugs || [],
  };
};