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
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "sinclair", 3,1 ),
       ("Michael", "mcintosh", 2,2),
       ("Sarah", "selblair", 2,3 ),
       ("Paul", "dims", 1,4)
       ("Michelle", "yarray", 1,3),
       ("Monica", "abdulla", 4,2),
       ("Larry", "clark", 3,3),
       ("david", "simons", 3,4);