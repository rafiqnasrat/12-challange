DROP DATABASE IF EXISTS emp_db;

CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE department
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);
 
CREATE TABLE role
(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50),
    salary FLOAT,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee
(
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    role_id VARCHAR(50),
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

