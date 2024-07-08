import React from "react";
import "./GetStarted.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Getstarted from "../../assets/todolist.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="GetStartedinside">
      <div className="GetStarted">
        <div className="l">
          <div className="firstline">
            "Stay organized, stay productive."
            <div className="para">
              <div className="first">
                <p>Welcome to Your To-Do List App</p>
                <p>
                  Simplify your life and boost your productivity with our
                  easy-to-use To-Do List application. Whether you're managing
                  daily tasks, planning projects, or setting personal goals, our
                  app is designed to help you stay on top of everything.
                </p>
                <p>
                  Get started now and experience the benefits of a
                  well-organized and productive lifestyle. Manage your tasks,
                  set reminders, and achieve your goals effortlessly.
                </p>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                maxWidth: "50%",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: 50,
                marginTop: "3%",
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="r">
          <div className="get">
            <img src={Getstarted} alt="To-Do List" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
