const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/db");

const authController = {
  //login
  async login(req, res) {
    const { username, password } = req.body;
    console.log("login==", username, password);
    try {
      const user = await pool.query(
        "SELECT * FROM userstable WHERE username = $1",
        [username]
      );
      console.log("user details ===", user.rows);
      if (user.rows.length === 0) {
        return res.status(401).json({ error: "Username not found" });
      }
  
      const isMatch = await bcrypt.compare(
        password,
        user.rows[0].password_hash
      );
      console.log("isMatch ===", isMatch);
      if (!isMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }
  
      const token = jwt.sign(
        { user_id: user.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "12h" } 
      );
      res.json({ token });
    } catch (error) {
      console.error(error.message, "errlogin");
      res.status(500).json({ error: "Internal server error" });
    }
  },
  

  //register
  async register(req, res) {
    const { username, password } = req.body;
    console.log("credentials===", username, password);
    try {
      const existingUser = await pool.query(
        "SELECT * FROM userstable WHERE username = $1",
        [username]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await pool.query(
        "INSERT INTO userstable (username, password_hash) VALUES ($1, $2) RETURNING id",
        [username, hashedPassword]
      );

      console.log("newUser====", newUser);

     
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //get allusers
  async allUsers(req, res) {
    try {
      const allUsers = await pool.query("SELECT id, username FROM userstable");
  
      res.status(200).json(allUsers.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  
};

module.exports = authController;
