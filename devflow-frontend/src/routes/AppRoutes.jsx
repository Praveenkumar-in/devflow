import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Projects from "../pages/projects/Projects";
import ProjectDetails from "../pages/projects/ProjectDetails";

import Tasks from "../pages/tasks/Tasks";
import TaskDetails from "../pages/tasks/TaskDetails";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import Teams from "../pages/teams/Teams";
import TeamDetails from "../pages/teams/TeamDetails";

import BugDetails from "../pages/bugs/BugDetails";
import Bugs from "../pages/bugs/Bugs";

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
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Projects */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        {/* Tasks */}
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />

        <Route
  path="/teams"
  element={
    <ProtectedRoute>
      <Teams />
    </ProtectedRoute>
  }
/>

<Route
  path="/teams/:id"
  element={
    <ProtectedRoute>
      <TeamDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/bugs"
  element={
    <ProtectedRoute>
      <Bugs />
    </ProtectedRoute>
  }
/>

<Route
  path="/bugs/:id"
  element={
    <ProtectedRoute>
      <BugDetails />
    </ProtectedRoute>
  }
/>


        {/* Future Pages */}
       
        
        <Route path="/ai" element={<h1>AI Assistant</h1>} />
        <Route path="/notifications" element={<h1>Notifications</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;