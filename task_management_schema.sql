-- Create the roles table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleId INT NOT NULL,
    FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create the tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dueDate DATETIME,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default roles 
INSERT INTO roles (name) VALUES ,('User');

-- Insert a default admin user (optional)
-- Password should be hashed before inserting into the database
INSERT INTO users (email, password, roleId) VALUES ('mina@example.com', 'hashed_password', 1);
