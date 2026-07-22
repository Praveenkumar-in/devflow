import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import { updateTask } from "../../services/taskService";
import { getProjects } from "../../services/projectService";
import { getUsers } from "../../services/userService";

const EditTaskModal = ({
  show,
  handleClose,
  task,
  refreshTasks,
}) => {

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    due_date: "",
  });

  useEffect(() => {

    if (show) {
      loadProjects();
      loadUsers();
    }

  }, [show]);

  useEffect(() => {

    if (task) {

      setFormData({
        project_id: task.project_id || "",
        assigned_to: task.assigned_to || "",
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Medium",
        status: task.status || "Pending",
        due_date: task.due_date
          ? task.due_date.slice(0, 10)
          : "",
      });

    }

  }, [task]);

  const loadProjects = async () => {

    try {

      const res = await getProjects();

      setProjects(res.data.projects || []);

    } catch {

      toast.error("Failed to load projects");

    }

  };

  const loadUsers = async () => {

    try {

      const res = await getUsers();

      setUsers(res.data.users || []);

    } catch {

      toast.error("Failed to load users");

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateTask(task.id, formData);

      toast.success("Task updated successfully");

      refreshTasks();

      handleClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );

    }

  };return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Form onSubmit={handleSubmit}>

        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Edit Task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {/* Project */}

          <Form.Group className="mb-3">
            <Form.Label>Project</Form.Label>

            <Form.Select
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.title}
                </option>
              ))}

            </Form.Select>
          </Form.Group>

          {/* Assigned User */}

          <Form.Group className="mb-3">
            <Form.Label>Assign To</Form.Label>

            <Form.Select
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.full_name}
                </option>
              ))}

            </Form.Select>
          </Form.Group>

          {/* Title */}

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>

            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </Form.Group>

          {/* Description */}

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              required
            />
          </Form.Group>

          <div className="row">

            <div className="col-md-6">

              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>

                <Form.Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Select>

              </Form.Group>

            </div>

            <div className="col-md-6">

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>

                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </Form.Select>

              </Form.Group>

            </div>

          </div>

          {/* Due Date */}

          <Form.Group>
            <Form.Label>Due Date</Form.Label>

            <Form.Control
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
            />

          </Form.Group>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
          >
            <i className="bi bi-check-circle me-2"></i>
            Update Task
          </Button>

        </Modal.Footer>

      </Form>
    </Modal>
  );
};

export default EditTaskModal;