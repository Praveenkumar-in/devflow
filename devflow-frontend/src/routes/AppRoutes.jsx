import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import ProjectDetails from "../pages/projects/ProjectDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Projects from "../pages/projects/Projects";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />


<Route path="/projects" element={<Projects />} />



<Route
  path="/projects/:id"
  element={<ProjectDetails />}
/>
        {/* Future Pages */}
        
        <Route path="/tasks" element={<h1>Tasks</h1>} />
        <Route path="/teams" element={<h1>Teams</h1>} />
        <Route path="/bugs" element={<h1>Bugs</h1>} />
        <Route path="/ai" element={<h1>AI Assistant</h1>} />
        <Route path="/notifications" element={<h1>Notifications</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;