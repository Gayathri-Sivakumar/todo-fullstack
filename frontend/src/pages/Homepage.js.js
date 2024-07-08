import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "../utils/axios";
import { Alert } from "@mui/material";

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, settaskToDelete] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("/tasks");
      console.log(response.data);
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${taskToDelete}`);
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setShowModal(false);
      setMessage("Student deleted successfully.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting student", err);
      setError("An error occurred. Please try again later.");
    }
  };
  const confirmDelete = (taskId) => {
    settaskToDelete(taskId);
    setShowModal(true);
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find((task) => task.id === id);
    await axios.put(`/tasks/${id}`, { ...task, completed: !task.completed });
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Tasks</h2>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Link to="/add" className="btn btn-primary">
          Add Task
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{new Date(task.due_date).toISOString().split("T")[0]}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                />
              </td>
              <td>
                <Link
                  to={`/view/${task.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  View
                </Link>
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
        <Modal.Body>Are you sure you want to delete this Task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Homepage;
