
INSERT INTO department(name)VALUES('Sales'),('Engineering'),('Finance'),('Legal'),('Marketing');

INSERT INTO role(title, salary, department_id)VALUES
('President', 120000, 1),
('Director', 90000, 2),
('Office Manager', 60000, 3),
('Web Developer', 50000, 4),
('Assistent', 40000, 5);

INSERT INTO employee(firstName, lastName, role_id, manager_id)VALUES
('John', 'Rob', 'Assistent', null),
('Rob', 'John', 'Director', 1),
('Lisa', 'Alen', 'Web Developer', 2),
('Peter', 'Woker', 'President', null);