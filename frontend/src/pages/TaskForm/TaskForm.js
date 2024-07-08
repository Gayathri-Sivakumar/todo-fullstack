import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "../../utils/axios";
import "./TaskForm.css"; // Custom styles for TaskForm

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    completed: false,
  });
  const [errors, setErrors] = useState({});
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
    if (validateForm()) {
      try {
        const formDataToSend = { ...formData };
        if (id) {
          await axios.put(`/tasks/${id}`, formDataToSend);
        } else {
          await axios.post("/tasks", formDataToSend);
        }
        navigate("/home");
      } catch (error) {
        setError("Error saving task");
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!formData.due_date) {
      errors.due_date = "Due date is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <div className="task-form">
        <h2 className="mb-4">{id ? "Edit Task" : "Add Task"}</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="dueDate" className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              isInvalid={!!errors.due_date}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.due_date}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="completed" className="mb-4">
            <Form.Check
              type="checkbox"
              label="Completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="button-group">
            <Button variant="primary" type="submit">
              {id ? "Update Task" : "Add Task"}
            </Button>
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TaskForm;
