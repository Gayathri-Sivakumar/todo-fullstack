const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");

router.post("/", createTask);
router.get("/", getAllTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
