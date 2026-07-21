import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: "bi-speedometer2",
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: "bi-folder2-open",
      path: "/projects",
    },
    {
      name: "Tasks",
      icon: "bi-list-task",
      path: "/tasks",
    },
    {
      name: "Teams",
      icon: "bi-people",
      path: "/teams",
    },
    {
      name: "Bugs",
      icon: "bi-bug",
      path: "/bugs",
    },
    {
      name: "AI Assistant",
      icon: "bi-stars",
      path: "/ai",
    },
    {
      name: "Notifications",
      icon: "bi-bell",
      path: "/notifications",
    },
    {
      name: "Profile",
      icon: "bi-person-circle",
      path: "/profile",
    },
  ];

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -120 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo">

        <i className="bi bi-kanban-fill"></i>

        <span>DevFlow</span>

      </div>

      <div className="menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <i className={`bi ${item.icon}`}></i>

            <span>{item.name}</span>

          </NavLink>
        ))}

      </div>

      <div className="sidebar-footer">

        <div className="footer-card">

          <i className="bi bi-lightning-charge-fill"></i>

          <h6>DevFlow Pro</h6>

          <small>Premium Workspace</small>

        </div>

      </div>
    </motion.aside>
  );
};

export default Sidebar;