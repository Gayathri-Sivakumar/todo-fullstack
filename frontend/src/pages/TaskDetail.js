// src/pages/TaskDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import axios from "../utils/axios";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        setError("Error fetching task details");
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`/tasks/${id}`);
    navigate("/home");
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Task Details</h2>
      <p>Title:{task.title}</p>
      <p>Description:{task.description}</p>
      <p>Due Date: {new Date(task.due_date).toISOString().split("T")[0]}</p>
      <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
      <Link to={`/edit/${task.id}`} className="btn btn-primary me-2">
        Edit
      </Link>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default TaskDetail;
