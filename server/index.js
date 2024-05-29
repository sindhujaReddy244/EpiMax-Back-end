const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");



const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
// app.use("/tasks", authMiddleware, taskRoutes);
app.use("/tasks",  taskRoutes);




// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


