import api from "./api";

// ==============================
// Get All Teams
// ==============================
export const getTeams = async () => {
  return await api.get("/teams");
};

// ==============================
// Get Team By ID
// ==============================
export const getTeamById = async (id) => {
  return await api.get(`/teams/${id}`);
};

// ==============================
// Create Team
// ==============================
export const createTeam = async (data) => {
  return await api.post("/teams", data);
};

// ==============================
// Update Team
// ==============================
export const updateTeam = async (id, data) => {
  return await api.put(`/teams/${id}`, data);
};

// ==============================
// Delete Team
// ==============================
export const deleteTeam = async (id) => {
  return await api.delete(`/teams/${id}`);
};

// ==============================
// Get Team Members
// ==============================
export const getTeamMembers = async (id) => {
  return await api.get(`/teams/${id}/members`);
};

// ==============================
// Add Member
// ==============================
export const addMember = async (id, data) => {
  return await api.post(`/teams/${id}/members`, data);
};

// ==============================
// Remove Member
// ==============================
export const removeMember = async (teamId, userId) => {
  return await api.delete(`/teams/${teamId}/members/${userId}`);
};