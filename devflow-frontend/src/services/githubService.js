import axios from "axios";

const API = "https://devflow-x25w.onrender.com/api/github";

// Redirect user to GitHub OAuth
export const loginGithub = () => {
  window.location.href = `${API}/login`;
};

// Get authenticated GitHub profile
export const getGithubProfile = async () => {
  const { data } = await axios.get(`${API}/profile`);
  return data;
};

// Get GitHub repositories
export const getGithubRepositories = async () => {
  const { data } = await axios.get(`${API}/repos`);
  return data;
};