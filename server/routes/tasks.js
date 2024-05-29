const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksController");
const authMiddleware = require("../middleware/authMiddleware");

// Create task
router.post("/createtask",  async (req, res) => {
  await taskController.createTask(req, res);
});


// Get all tasks
router.get("/alltasks",  async (req, res) => {
  await taskController.getAllTasks(req, res);
});

// Get task by ID
router.get("/task/:id", authMiddleware, async (req, res) => {
  await taskController.getTaskById(req, res);
});

// Update task status
router.put("/taskstatus/:id",  async (req, res) => {
  await taskController.updateTask(req, res);
});

// Update task status
router.put("/asignedtask/:id",  async (req, res) => {
  await taskController.updateTaskAssigned(req, res);
});

//getAllCompletedTasks
router.get("/completedtasks",  async (req, res) => {
  await taskController.getAllCompletedTasks(req, res);
});

// Delete task
router.delete("/deletetask/:id", async (req, res) => {
  await taskController.deleteTask(req, res);
});

module.exports = router;
