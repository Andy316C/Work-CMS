const inquirer= require("inquirer");
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'AndyBC2023',
    database: 'WORK_CMS'
    },
    console.log(`Connected to the WORK_CMS database.`)
);


function selectedOption(){

inquirer
    .prompt([
        {
        type: "input",
        message: "view departments, view roles, view employees, add department, add role, add employee, update employee role",
        name: "SelectQuery",
        }
    
    ])
    .then(function (response) {
        if(response.SelectQuery == "view departments"){
            db.query('select * from department', function (err, results) {
                console.log(results);
                return selectedOption();
            });
        }else if(response.SelectQuery == "view roles"){
            db.query('SELECT role.id , role.title, department.department_name,role.salary  FROM role JOIN department ON department.id = role.id;', function (err, results) {
                console.log(results);
                return selectedOption();
            });
        }else if(response.SelectQuery == "view employees"){
            db.query(`
            SELECT employee.id , employee.first_name, employee.last_name,role.title, department.department_name, role.salary 
            FROM role JOIN department ON department.id = role.id JOIN employee ON employee.role_id = role.id;
            `, function (err, results) {
                console.log(results);
                return selectedOption();
            });
        }else if(response.SelectQuery == "add department"){
            inquirer
                .prompt([
                {
                    type: "input",
                    message: "enter name of department",
                    name: "addDept",
                    }
                ])
                .then((response) =>
                db.promise().query(`INSERT INTO department (department_name) VALUES (?);`,response.addDept)
                )
                .then( ([rows,fields]) => {
                    console.log(rows);
                    console.log("Entry Added ");
                    return selectedOption()
                })
                
        }else if(response.SelectQuery == "add role"){
            inquirer
                .prompt([
                {
                    type: "input",
                    message: "enter name of role",
                    name: "addName",
                },
                {
                    type: "input",
                    message: "enter salary",
                    name: "addSalary",
                },
                {
                    type: "input",
                    message: "enter department id",
                    name: "addDept",
                }
                ])
                .then((response) =>
                db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`,[response.addName,response.addSalary,response.addDept])
                )
                .then( ([rows,fields]) => {
                    console.log(rows);
                    console.log("Entry Added ");
                    return selectedOption()
                })
                
        }else if(response.SelectQuery == "add employee"){
            inquirer
                .prompt([
                {
                    type: "input",
                    message: "enter first name",
                    name: "firstName",
                },
                {
                    type: "input",
                    message: "enter last name",
                    name: "lastName",
                },
                {
                    type: "input",
                    message: "enter role id",
                    name: "addRole",
                },
                {
                    type: "input",
                    message: "enter manager id",
                    name: "addManager",
                }
                ])
                .then((response) =>
                db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,[response.firstName,response.lastName,response.addRole,response.addManager.length || null])

                )
                .then( ([rows,fields]) => {
                    console.log(rows);
                    console.log("Entry Added ");
                    return selectedOption()
                })
                
        }else if(response.SelectQuery == "update employee role"){
            inquirer
                .prompt([
                {
                        type: "input",
                        message: "enter employee id to update role",
                        name: "Update",
                },
                {
                    type: "input",
                    message: "enter new role id of employee",
                    name: "addRole",
                },
                
                ])
                .then((response) =>
                db.promise().query(`UPDATE employee SET role_id = ? WHERE id = ? ;`,[response.addRole,response.Update])
                )
                .then( ([rows,fields]) => {
                    console.log(rows);
                    console.log("Role Updated ");
                    return selectedOption()
                })
                
        }
        
        
        
    })
}
selectedOption()





    /* GIVEN a command-line application that accepts user input

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database*/