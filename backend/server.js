const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./db/db");
const { authenticateToken } = require("./middlewares/authMiddleware");

const app = express();
const port = 8081;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/tasks", authenticateToken, taskRoutes);
app.use("/auth", authRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync(); // Sync all defined models to the DB

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
