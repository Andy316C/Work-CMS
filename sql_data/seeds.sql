INSERT INTO department (department_name)
VALUES ("field_services"),
       ("human_resources"),
       ("sales"),
       ("information_technology");
       

INSERT INTO roles (role_id, role_title)
VALUES (1, "Creating Business content"),
       (2, "Dealing with work place legality concerns"),
       (3, "Generate business revenue"),
       (4, "systems administrator");
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "sinclair", 3, 3),
       ("Michael", "mcintosh", 2 ),
       ("Sarah", "selblair", 2, 2),
       ("Paul", "dims", 1, 1),
       ("Michelle", "yarray", 1 ),
       ("Monica", "abdulla", 4, 4),
       ("Larry", "clark", 3 ),
       ("david", "simons", 3);