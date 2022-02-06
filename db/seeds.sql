use employeeDB; 

INSERT INTO department
    (name)
VALUES
    ('Royal'),
    ('Support'),
    ('Proletariat');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Queen Bee', 250000, 1),
    ('Bee in Waiting', 30000, 2),
    ('Attendant', 25000, 3),
    ('Head Drone', 15000, 4),
    ('Drone', 10000, 5);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES  
    ('Beatrice', 'Bee', 1, NULL),
    ('Beet', 'Beaker', 2, 1),
    ('Belle', 'Bean', 3, 1),
    ('Bobbia', 'Beal', 5, 3),
    ('Bernita', 'Beard', 5, 1),
    ('Bensa', 'Beed', 5, 5);