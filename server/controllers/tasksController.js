const Task = require("../models/Task");

const taskController = {
  //create task
  async createTask(req, res) {
    const { title, description, status, assignee_id } = req.body;
    try {
      const task = new Task();
      const newTask = await task.createTask(
        title,
        description,
        status,
        assignee_id
      );
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //get all tasks
  async getAllTasks(req, res) {
    try {
      const task = new Task();
      const tasks = await task.getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //get task by id
  async getTaskById(req, res) {
    const { id } = req.params;
    try {
      const task = new Task();
      const foundTask = await task.getTaskById(id);
      if (!foundTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(foundTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //updateStatus
  async updateTask(req, res) {
    const { id } = req.params;
    const { status } = req.body; // Only retrieve the status from the request body

    try {
      const task = new Task();
      const updateStatus = await task.getUpdateStatus(id);

      if (!updateStatus) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(updateStatus);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //task assigned updateTaskAssigned
  async updateTaskAssigned(req, res) {
    const { id } = req.params;
    const { selectedUsers } = req.body; // Array of selected user IDs

    try {
      const task = new Task();
      const updateStatus = await task.getUpdateAssigned(id, selectedUsers);

      if (!updateStatus) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({ message: "Task updated successfully", task: updateStatus }); // Include success message
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //get task completed
  async getAllCompletedTasks(req, res) {
    try {
      const task = new Task();
      const tasks = await task.getTasksByStatus("Completed");
      res.json(tasks);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //delete
  async deleteTask(req, res) {
    const { id } = req.params;
    try {
      const task = new Task();
      const deletedTask = await task.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = taskController;
