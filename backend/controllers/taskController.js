const Task = require("../models/Task");

async function createTask(req, res) {
  try {
    const { title, description, due_date, completed } = req.body;

    // Determine status based on completed flag
    const status = completed ? "completed" : "pending";

    const formattedDueDate = new Date(due_date).toISOString().split("T")[0];
    const newTask = await Task.create({
      title,
      description,
      due_date: formattedDueDate,
      status,
      userId: req.user.id,
    });

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating Task:", error);
    res.status(500).json({ message: "Error creating Task" });
  }
}

async function getAllTask(req, res) {
  try {
    const userId = req.user.id;
    const Tasks = await Task.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(Tasks);
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    res.status(500).json({ message: "Error fetching Tasks" });
  }
}

async function getTaskById(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching Task:", error);
    res.status(500).json({ message: "Error fetching Task" });
  }
}

async function updateTask(req, res) {
  try {
    const id = req.params.id;
    const { title, description, due_date, completed } = req.body;

    const status = completed ? "completed" : "pending";
    const formattedDueDate = new Date(due_date).toISOString().split("T")[0];

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const userId = req.user.id;
    console.log(userId);
    console.log(req.body);

    await task.update({
      title,
      description,
      due_date: formattedDueDate,
      status,
      userId: userId,
    });

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating Task:", error);
    res.status(500).json({ message: "Error updating Task" });
  }
}

async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting Task:", error);
    res.status(500).json({ message: "Error deleting Task" });
  }
}

module.exports = {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
};
