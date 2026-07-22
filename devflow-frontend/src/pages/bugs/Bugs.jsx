import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import BugCard from "../../components/bugs/BugCard";

import {
  getBugs,
  deleteBug,
} from "../../services/bugService";

import CreateBugModal from "./CreateBugModal";
import EditBugModal from "./EditBugModal";
import DeleteBugModal from "./DeleteBugModal";

const Bugs = () => {

  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedBug, setSelectedBug] = useState(null);

  const fetchBugs = async () => {

    try {

      setLoading(true);

      const res = await getBugs();

      setBugs(res.bugs || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to load bugs"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const filteredBugs = useMemo(() => {

    return bugs.filter((bug) => {

      const matchesSearch =
        bug.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        bug.project_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        !statusFilter || bug.status === statusFilter;

      const matchesPriority =
        !priorityFilter || bug.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );

    });

  }, [bugs, search, statusFilter, priorityFilter]);

  const handleEdit = (bug) => {

    setSelectedBug(bug);
    setShowEdit(true);

  };

  const handleDelete = (bug) => {

    setSelectedBug(bug);
    setShowDelete(true);

  };

  const confirmDelete = async () => {

    try {

      await deleteBug(selectedBug.id);

      toast.success("Bug deleted successfully");

      setShowDelete(false);

      fetchBugs();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to delete bug"
      );

    }

  };

  return (

    <motion.div
      className="container-fluid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">

            <i className="bi bi-bug-fill text-danger me-2"></i>

            Bug Reports

          </h2>

          <p className="text-muted mb-0">

            Track and manage project bugs.

          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowCreate(true)}
        >

          <i className="bi bi-plus-circle me-2"></i>

          Report Bug

        </button>

      </div>

      {/* Filters */}

      <div className="glass-card p-3 mb-4">

        <div className="row g-3">

          <div className="col-md-4">

            <input
              type="text"
              className="form-control"
              placeholder="Search bugs..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="">
                All Status
              </option>

              <option value="Open">
                Open
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >

              <option value="">
                All Priorities
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Content */}

      {loading ? (

        <div className="text-center py-5">

          <div className="spinner-border text-primary"></div>

        </div>

      ) : filteredBugs.length === 0 ? (

        <div className="glass-card text-center py-5">

          <i
            className="bi bi-bug"
            style={{
              fontSize: "4rem",
              color: "#6c757d",
            }}
          ></i>

          <h4 className="mt-3">
            No Bugs Found
          </h4>

          <p className="text-muted">
            Start by reporting a new bug.
          </p>

        </div>

      ) : (

        <div className="row g-4">

          {filteredBugs.map((bug) => (

            <div
              key={bug.id}
              className="col-xl-4 col-lg-6"
            >

              <BugCard
                bug={bug}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

            </div>

          ))}

        </div>

      )}
      {/* Create Bug Modal */}

      <CreateBugModal
        show={showCreate}
        handleClose={() => setShowCreate(false)}
        onSuccess={() => {
          setShowCreate(false);
          fetchBugs();
        }}
      />

      {/* Edit Bug Modal */}

      <EditBugModal
        show={showEdit}
        handleClose={() => {
          setShowEdit(false);
          setSelectedBug(null);
        }}
        bug={selectedBug}
        onSuccess={() => {
          setShowEdit(false);
          setSelectedBug(null);
          fetchBugs();
        }}
      />

      {/* Delete Bug Modal */}

      <DeleteBugModal
        show={showDelete}
        handleClose={() => {
          setShowDelete(false);
          setSelectedBug(null);
        }}
        bug={selectedBug}
        onConfirm={confirmDelete}
      />

    </motion.div>

  );

};

export default Bugs;