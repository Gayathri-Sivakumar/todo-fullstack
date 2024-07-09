import React from "react";
import { Link } from "react-router-dom";
import "./EmptyState.css";
import Emptypage from "../../assets/emptypage.jpg";

const EmptyState = ({ message, showAddButton }) => {
  const isNoTasksFound = message === "No tasks found.";

  return (
    <div
      className={
        isNoTasksFound ? "empty-state-container2" : "empty-state-container"
      }
    >
      {!isNoTasksFound && (
        <img src={Emptypage} alt="No tasks" className="empty-image" />
      )}
      <h3>{message}</h3>
      {showAddButton && (
        <Link to="/add" className="btn btn-primary">
          Add Task
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
