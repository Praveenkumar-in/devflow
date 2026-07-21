import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="glass-card p-5"
      >

        <div className="text-center mb-4">

          <i className="bi bi-kanban-fill display-3 text-info"></i>

          <h2 className="fw-bold mt-3">
            DevFlow
          </h2>

          <p className="text-light opacity-75">
            Welcome Back
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                <i
                  className={`bi ${
                    showPassword
                      ? "bi-eye-slash"
                      : "bi-eye"
                  }`}
                ></i>

              </button>

            </div>

          </div>

          <button
            className="btn btn-gradient w-100 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <div className="text-center mt-4">

          <small>

            Don't have an account?

            <Link
              to="/register"
              className="ms-2 text-info text-decoration-none"
            >
              Register
            </Link>

          </small>

        </div>

      </motion.div>

    </div>
  );
};

export default Login;