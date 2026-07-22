import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="navbar glass-navbar px-4 py-3"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="container-fluid">

        {/* Left */}
        <div>
          <h4 className="text-white fw-bold mb-0">
            Daashboard
          </h4>

          <small className="text-light opacity-75">
            Welcome back 👋
          </small>
        </div>

        {/* Right */}
        <div className="d-flex align-items-center gap-3">

          {/* Search */}
          <button className="nav-icon-btn">
            <i className="bi bi-search"></i>
          </button>

          {/* Notifications */}
          <Link
            to="/notifications"
            className="nav-icon-btn position-relative text-decoration-none"
          >
            <i className="bi bi-bell"></i>
            <span className="notification-dot"></span>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="profile-btn text-decoration-none"
          >
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
            />

            <div className="d-none d-md-block">
              <h6 className="mb-0 text-white">
                My Profile
              </h6>

              <small className="text-light opacity-75">
                View Profile
              </small>
            </div>
          </Link>

        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;