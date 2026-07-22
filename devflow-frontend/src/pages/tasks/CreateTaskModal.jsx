import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import { createTask } from "../../services/taskService";
import { getProjects } from "../../services/projectService";
import { getUsers } from "../../services/userService";

const CreateTaskModal = ({
  show,
  handleClose,
  refreshTasks,
}) => {

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const initialForm = {
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    due_date: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {

    if (show) {
      loadProjects();
      loadUsers();
    }

  }, [show]);

  const loadProjects = async () => {

    try {

      const res = await getProjects();

      setProjects(res.data.projects || []);

    } catch (error) {

      toast.error("Failed to load projects");

    }

  };

  const loadUsers = async () => {

    try {

      const res = await getUsers();

      setUsers(res.data.users || []);

    } catch (error) {

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

      await createTask(formData);

      toast.success("Task created successfully");

      refreshTasks();

      setFormData(initialForm);

      handleClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to create task"
      );

    }

  };
return (
  <Modal
    show={show}
    onHide={handleClose}
    centered
    size="lg"
    dialogClassName="task-modal"
  >
    <Form onSubmit={handleSubmit}>

      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-list-task me-2"></i>
          Create Task
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {/* Project */}

        <Form.Group className="mb-3">
          <Form.Label>Project</Form.Label>

          <Form.Select
            className="premium-input"
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
            className="premium-input"
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
            className="premium-input"
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
            className="premium-input"
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

          {/* Priority */}

          <div className="col-md-6">

            <Form.Group className="mb-3">

              <Form.Label>Priority</Form.Label>

              <Form.Select
                className="premium-input"
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

          {/* Status */}

          <div className="col-md-6">

            <Form.Group className="mb-3">

              <Form.Label>Status</Form.Label>

              <Form.Select
                className="premium-input"
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
            className="premium-input"
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
          variant="outline-light"
          onClick={handleClose}
        >
          <i className="bi bi-x-circle me-2"></i>
          Cancel
        </Button>

        <Button
          variant="primary"
          type="submit"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Create Task
        </Button>

      </Modal.Footer>

    </Form>
  </Modal>
);
};

export default CreateTaskModal;