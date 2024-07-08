import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "../../utils/axios";
import { Alert } from "@mui/material";
import TaskDetailModal from "../TaskDetails/TaskDetailModal";
import "./Homepage.css";
import AuthContext from "../../context/AuthContext";

const Homepage = () => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, settaskToDelete] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [taskDetailModal, setTaskDetailModal] = useState({
    show: false,
    taskId: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks");
        setTasks(response.data);
      } catch (err) {
        setError("Failed to fetch tasks.");
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${taskToDelete}`);
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setShowModal(false);
      setMessage("Task deleted successfully.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const confirmDelete = (taskId) => {
    settaskToDelete(taskId);
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewTask = (taskId) => {
    setTaskDetailModal({ show: true, taskId });
  };

  const handleCloseTaskDetailModal = (shouldRefresh) => {
    setTaskDetailModal({ show: false, taskId: null });
    if (shouldRefresh) {
      // Refresh tasks after delete
      const fetchTasks = async () => {
        try {
          const response = await axios.get("/tasks");
          setTasks(response.data);
        } catch (err) {
          setError("Failed to fetch tasks.");
        }
      };
      fetchTasks();
    }
  };

  return (
    <div className="homepage-container">
      <div className="header">
        <h2>Tasks</h2>
        <div className="header-buttons">
          <Link to="/add" className="btn btn-primary">
            Add Task
          </Link>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Table striped bordered hover className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{new Date(task.due_date).toISOString().split("T")[0]}</td>
              <td>{task.status}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewTask(task.id)}
                  className="me-2"
                >
                  View
                </Button>
                <Link
                  to={`/edit/${task.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmDelete(task.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <TaskDetailModal
        taskId={taskDetailModal.taskId}
        show={taskDetailModal.show}
        handleClose={handleCloseTaskDetailModal}
      />
    </div>
  );
};

export default Homepage;
