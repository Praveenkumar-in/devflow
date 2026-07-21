import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Developer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success(
        response.data.message || "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">

      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <div className="text-center mb-4">

          <i className="bi bi-kanban-fill display-3 text-info"></i>

          <h2 className="fw-bold mt-3">
            Create Account
          </h2>

          <p className="text-light opacity-75">
            Join DevFlow
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Full Name
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="John Doe"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />

            </div>

          </div>

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
                placeholder="example@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="mb-3">

            <label className="form-label">
              Role
            </label>

            <div className="d-flex gap-4 mt-2">

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="developer"
                  value="Developer"
                  checked={formData.role === "Developer"}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label"
                  htmlFor="developer"
                >
                  Developer
                </label>

              </div>

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  id="admin"
                  value="Admin"
                  checked={formData.role === "Admin"}
                  onChange={handleChange}
                />

                <label
                  className="form-check-label"
                  htmlFor="admin"
                >
                  Admin
                </label>

              </div>

            </div>

          </div>

          <div className="mb-3">

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
                placeholder="Password"
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

          <div className="mb-4">

            <label className="form-label">
              Confirm Password
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-shield-lock"></i>
              </span>

              <input
                type={showConfirm ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >

                <i
                  className={`bi ${
                    showConfirm
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
                Creating Account...
              </>
            ) : (
              "Register"
            )}

          </button>

        </form>

        <div className="text-center mt-4">

          <small>

            Already have an account?

            <Link
              to="/"
              className="text-info text-decoration-none ms-2"
            >
              Login
            </Link>

          </small>

        </div>

      </motion.div>

    </div>
  );
};

export default Register;