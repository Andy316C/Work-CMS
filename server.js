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
        message: "1: View all departments, 2: View all roles, 3: View all employees, 4: add a department, 5: Add a role, 6: Add an employee, 7: Update employee role",
        name: "SelectQuery",
        }
       
    ])
    .then(function (response) {
        if(response.SelectQuery == 1){
            db.query('select * from department', function (err, results) {
                console.log(results);
                return selectedOption();
            });
        }else if(response.SelectQuery == 2){
            db.query('SELECT role.id , role.title, department.department_name,role.salary  FROM role JOIN department ON department.id = role.id;', function (err, results) {
                console.log(results);
                return selectedOption();
            });
        }else if(response.SelectQuery == 3){
            db.query(`
            SELECT employee.id , employee.first_name, employee.last_name,role.title, department.department_name, role.salary 
            FROM role JOIN department ON department.id = role.id JOIN employee ON employee.role_id = role.id;
            `, function (err, results) {
                console.log(results);
                return selectedOption();
            });
        }else if(response.SelectQuery == 4){
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
                  console.log("Entry Added ")
                  return selectedOption()
                })
                
        }else if(response.SelectQuery == 5){
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
                    message: "enter name of department",
                    name: "addDept",
                }
                ])
                .then((response) =>
                db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`,[response.addName,response.addSalary,response.addDept])
                )
                .then( ([rows,fields]) => {
                  console.log(rows);
                  console.log("Entry Added ")
                  return selectedOption()
                })
                
        }else if(response.SelectQuery == 6){
            inquirer
                .prompt([
                {
                    type: "input",
                    message: "enter name of employee",
                    name: "addName",
                },
                {
                    type: "input",
                    message: "enter salary",
                    name: "addSalary",
                },
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
                  console.log("Entry Added ")
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