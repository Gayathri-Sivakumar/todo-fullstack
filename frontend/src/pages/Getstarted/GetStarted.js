import React from "react";
import "./GetStarted.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Getstarted from "../../assets/cover3.png";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="GetStartedinside">
      <div className="GetStarted">
        <div className="l">
          <div className="firstline">
            "Empowering students, enriching futures."
            <div className="para">
              <div className="first">
                <p>ABC College Student Management System </p>
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
            <div>
              <img src={Getstarted} alt="logo" height={700} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
