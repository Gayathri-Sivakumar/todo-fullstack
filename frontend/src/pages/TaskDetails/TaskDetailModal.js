import React, { useState, useEffect } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import axios from "../../utils/axios";
import "./TaskDetailModal.css";

const TaskDetailModal = ({ taskId, show, handleClose }) => {
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`/tasks/${taskId}`);
          setTask(response.data);
        } catch (error) {
          setError("Error fetching task details");
        }
      };
      fetchTask();
    }
  }, [taskId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      handleClose(true); // Notify parent to refresh tasks
    } catch (error) {
      setError("Error deleting task");
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Modal show={show} onHide={() => handleClose(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!task ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="modal-text">
              <strong>Title:</strong> {task.title}
            </p>
            <p className="modal-text">
              <strong>Description:</strong> {task.description}
            </p>
            <p className="modal-text">
              <strong>Due Date:</strong>{" "}
              {new Date(task.due_date).toISOString().split("T")[0]}
            </p>
            <p className="modal-text">
              <strong>Status:</strong>{" "}
              {task.completed ? "Completed" : "Incomplete"}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailModal;
