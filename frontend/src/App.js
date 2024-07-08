import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GetStarted from "./pages/Getstarted/GetStarted";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage.js";
import TaskDetail from "./pages/TaskDetail";
import TaskForm from "./pages/TaskForm";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute element={Homepage} />} />
          <Route path="/add" element={<PrivateRoute element={TaskForm} />} />
          <Route
            path="/view/:id"
            element={<PrivateRoute element={TaskDetail} />}
          />
          <Route
            path="/edit/:id"
            element={<PrivateRoute element={TaskForm} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
