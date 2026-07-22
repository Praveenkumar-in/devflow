import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  getTasks,
  deleteTask,
} from "../../services/taskService";

import TaskCard from "../../components/tasks/TaskCard";

import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";


const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await getTasks();

      setTasks(res.data.tasks || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEdit(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(selectedTask.id);

      toast.success("Task deleted successfully");

      setShowDelete(false);

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <i className="bi bi-list-task me-2"></i>
          Tasks
        </motion.h2>

        <button
          className="btn btn-primary"
          onClick={() => setShowCreate(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          New Task
        </button>

      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-5">

          <i
            className="bi bi-list-task"
            style={{ fontSize: "4rem" }}
          ></i>

          <h4 className="mt-3">
            No Tasks Found
          </h4>

          <p className="text-muted">
            Create your first task.
          </p>

        </div>
      ) : (
        <div className="row g-4">

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

        </div>
      )}

      {/* Modals */}

      <CreateTaskModal
        show={showCreate}
        handleClose={() => setShowCreate(false)}
        refreshTasks={fetchTasks}
      />

      <EditTaskModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        task={selectedTask}
        refreshTasks={fetchTasks}
      />

      <DeleteTaskModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
        task={selectedTask}
      />

    </div>
  );
};

export default Tasks;