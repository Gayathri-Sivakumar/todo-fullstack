import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "../utils/axios";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    completed: false,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`/tasks/${id}`);

          const { title, description, due_date, completed } = response.data;
          setFormData({
            title,
            description,
            due_date: new Date(due_date).toISOString().split("T")[0],
            completed,
          });
        } catch (error) {
          setError("Error fetching task details");
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        ...formData,
      };
      if (id) {
        console.log("Updating task with id:", id);
        await axios.put(`/tasks/${id}`, formDataToSend);
      } else {
        console.log("Creating new task", formDataToSend);
        await axios.post("/tasks", formDataToSend);
      }
      navigate("/home");
    } catch (error) {
      setError("Error saving task");
    }
  };
  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Task" : "Add Task"}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="completed">
          <Form.Check
            type="checkbox"
            label="Completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? "Update Task" : "Add Task"}
        </Button>
        {id ? (
          <Button variant="secondary" className="ms-2" onClick={handleBack}>
            Cancel
          </Button>
        ) : (
          <Button variant="secondary" className="ms-2" onClick={handleBack}>
            Back
          </Button>
        )}
      </Form>
    </div>
  );
};

export default TaskForm;
