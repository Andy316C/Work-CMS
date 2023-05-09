INSERT INTO department (department_name)
VALUES ("field_services"),
       ("human_resources"),
       ("sales"),
       ("information_technology");
       

INSERT INTO role (title, salary, department_id)
VALUES ("field_services_officer", 60000,1),
       ("human_resources_officer",70000,2),
       ("salesman",80000,3),
       ("systems_administrator",90000,4);
       

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("David", "sinclair", 3 ),
       ("Michael", "mcintosh", 2 ),
       ("Sarah", "selblair", 2 ),
       ("Paul", "dims", 1),
       ("Michelle", "yarray", 1),
       ("Monica", "abdulla", 4),
       ("Larry", "clark", 3 ),
       ("david", "simons", 3);