USE employee_db;

INSERT INTO DEPARTMENT  (department_name) VALUES
('Sales'),
('IT'),
('Marketing'),
('Service');

INSERT INTO ROLES(title,salary,department_id)VALUES
('Sales Manager',100000,1),
('Project Manager', 100000, 1),
('Programmer', 100000, 2),
('Graphic Designer', 70000, 3),
('S/W Installer', 50000, 4);

INSERT INTO EMPLOYEE(first_name,last_name,role_id,manager_id)VALUES
('Braden','Dawson',2,null),
('Joe', 'Doe',1,null),
('Jeff', 'Davis',3,1),
('Jane', 'Johnson',4,1),
('Jason', 'Jeffer',5,1);
