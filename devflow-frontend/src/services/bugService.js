import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://devflow-x25w.onrender.com/api";

// Get Auth Headers
const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get All Bugs
export const getBugs = async () => {
  const response = await axios.get(`${API}/bugs`, getHeaders());
  return response.data;
};

// Get Bug By ID
export const getBugById = async (id) => {
  const response = await axios.get(`${API}/bugs/${id}`, getHeaders());
  return response.data;
};

// Create Bug
export const createBug = async (formData) => {
  const response = await axios.post(
    `${API}/bugs`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update Bug
export const updateBug = async (id, formData) => {
  const response = await axios.put(
    `${API}/bugs/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete Bug
export const deleteBug = async (id) => {
  const response = await axios.delete(
    `${API}/bugs/${id}`,
    getHeaders()
  );

  return response.data;
};

// Assign Bug
export const assignBug = async (id, assigned_to) => {
  const response = await axios.put(
    `${API}/bugs/${id}/assign`,
    { assigned_to },
    getHeaders()
  );

  return response.data;
};

// Update Bug Status
export const updateBugStatus = async (id, status) => {
  const response = await axios.put(
    `${API}/bugs/${id}/status`,
    { status },
    getHeaders()
  );

  return response.data;
};