import api from "./api";

// ==============================
// Get All Tasks
// ==============================
export const getTasks = async () => {
  return await api.get("/tasks");
};

// ==============================
// Get Task By ID
// ==============================
export const getTaskById = async (id) => {
  return await api.get(`/tasks/${id}`);
};

// ==============================
// Create Task
// ==============================
export const createTask = async (taskData) => {
  return await api.post("/tasks", taskData);
};

// ==============================
// Update Task
// ==============================
export const updateTask = async (id, taskData) => {
  return await api.put(`/tasks/${id}`, taskData);
};

// ==============================
// Delete Task
// ==============================
export const deleteTask = async (id) => {
  return await api.delete(`/tasks/${id}`);
};