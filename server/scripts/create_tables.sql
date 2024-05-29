-- users table
CREATE TABLE UsersTable (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);


-- tasks table
CREATE TABLE Tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT,
  assignee_id INTEGER REFERENCES UsersTable(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(assignee_id) REFERENCES UsersTable(id)
);
