

const pool = require('../config/db');

class Task {
  //create
  async createTask(title, description, status, assignee_id) {
    try {
      const query = 'INSERT INTO Tasks (title, description, status, assignee_id) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [title, description, status, assignee_id];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Error creating task');
    }
  }

  //get all tasks
  async getAllTasks() {
    try {
      const query = 'SELECT * FROM Tasks';
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error('Error fetching tasks');
    }
  }

  //get task by id
  async getTaskById(id) {
    try {
      const query = 'SELECT * FROM Tasks WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error fetching task by ID');
    }
  }


  //update staus
  async getUpdateStatus(id) {
    try {
      const query = "UPDATE Tasks SET status = $1 WHERE id = $2 RETURNING *";
      const values = ["Completed", id]; // Set the status to 'Completed'
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Error updating task');
    }
  }

  //update assigned
  async getUpdateAssigned(id, selectedUsers) {
    try {
      const query =
      "UPDATE Tasks SET assignee_id = $1 WHERE id = $2 RETURNING *";
    const values = [selectedUsers, id]; // Use selectedUsers directly as the value for assignee_id
    const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Error updating task');
    }
  }

  //get status completed tasks
  async getTasksByStatus(status) {
    try {
      const query = 'SELECT * FROM Tasks WHERE status = $1';
      const values = [status]; 
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      throw new Error('Error fetching tasks by status');
    }
  }



  //delete
  async deleteTask(id) {
    try {
      const query = 'DELETE FROM Tasks WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error deleting task');
    }
  }
}

module.exports = Task;
