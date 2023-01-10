// Import `inquirer` module.
const inquirer = require("inquirer")
// Import `mysql2` module.
const mysql = require("mysql2")
// Import `console.table` module.
const consoleTable = require('console.table');

// Use the port number in the environment variable, or if environment variable is not defined, use port 3003.
const PORT = process.env.PORT || 3003;

// Create connection to `employee_db` database, and call `init()` to start displaying Inquirer prompts in the terminal.
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_db',
        port: 8889
    },
    console.log(`Connected to the movies_db database.`),
    init()
);

// This function initializes the program.
// Use Inquirer to ask questions.
function init() {
    inquirer.prompt([
        {
            type: "list",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update An Employee Role",
                "Exit Application"
            ],
            message: "Please select one of the following options: ",
            name: "options"
        }]).then(response => {
            // Use switch statement to handle answers.
            switch (response.options) {
                case "View All Departments":
                    viewAllDepartments()
                    break
                case "View All Roles":
                    viewAllRoles()
                    break
                case "View All Employees":
                    viewAllEmployees()
                    break
                case "Add A Department":
                    addDepartment()
                    break
                case "Add A Role":
                    addRole()
                    break
                case "Add An Employee":
                    addEmployee()
                    break
                case "Update An Employee Role":
                    updateEmployeeRole()
                    break
                case "update role":
                    addUpdateRoll()
                    break
                default:
                    db.end()
                    process.exit(0)

            }
        })
}

// Will provide a formatted table showing department names and department ids
function viewAllDepartments() {
    db.query("SELECT * FROM DEPARTMENT;", function (err, dbrecords) {
        if (err) console.log(err)
        console.table(dbrecords)
        init()
    })
}

// Will provide a formatted table with the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles() {
    db.query("SELECT * FROM ROLES;", function (err, dbrecords) {
        if (err) console.log(err)
        console.table(dbrecords)
        init()
    })
}

// Will provide a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
function viewAllEmployees() {
    db.query("SELECT * FROM EMPLOYEE", function (err, dbrecords) {
        if (err) console.log(err)
        console.table(dbrecords)
        init()
    })
}

// Add a new department to the database.
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter additional department: ",
            name: "additionalDepartment"
        }
    ]).then(response => {
        const additionalDepartment = response.additionalDepartment
        db.query(`INSERT INTO DEPARTMENT (department_name) VALUES ("${additionalDepartment}")`, function (err, result) {
            if (err) console.log(err)
            console.log(`You have successfully created the ${additionalDepartment}.`)
            init();
        })
    })
}

// Add a new role to the database.  
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter employee's title: ",
            name: "title"
        },
        {
            type: "input",
            message: "Please enter employee's salary: ",
            name: "salary"
        },
        {
            type: "input",
            message: "Please enter employee's department ID: ",
            name: "department_id"
        }
    ]).then(response => {
        const title = response.title
        const salary = response.salary
        const department_id = response.department_id
        db.query(`INSERT INTO ROLES(title,salary,department_id) VALUES ("${title}",${salary},${department_id})`, function (err, result) {
            if (err) console.log(err)
            console.log(`You have successfully entered the new employee informattion for ${title}.`)
            init();
        })
    })
}



// Add a new employee to the database.
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter employee's first name: ",
            name: "first_name"
        },
        {
            type: "input",
            message: "Please enter employee's last name: ",
            name: "last_name"
        },
        {
            type: "input",
            message: "Please enter employee's role ID: ",
            name: "role_id"
        },
        {
            type: "input",
            message: "Please enter employee's manager: ",
            name: "manager_id"
        }
    ]).then(response => {
        const first_name = response.first_name
        const last_name = response.last_name
        const role_id = response.role_id
        const manager_id = response.manager_id
        db.query(`INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`, function (err, result) {
            if (err) console.log(err)
            console.log(`You have successfully entered the new employee informattion for ${first_name} ${last_name}.`)
            init();
        })
    })
}
// User is prompted to enter an employee to update and their new role and this information is updated in the database. 
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the first name of the employee whose role you wish to update: ",
            name: "first_name"
        },
        {
            type: "input",
            message: "Please enter the last name of the employee whose role you wish to update: ",
            name: "last_name"
        },
        {
            type: "input",
            message: "Please enter the role ID of the employee whose role you wish to update: ",
            name: "role_id"
        },
    ]).then(response => {
        const first_name = response.first_name
        const last_name = response.last_name
        const role_id = response.role_id
        db.query(`UPDATE EMPLOYEE SET role_id = "${role_id}" WHERE first_name = "${first_name}" AND last_name = "${last_name}"`, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Successfully updated the role of ${first_name} ${last_name} to role ID ${role_id}.`);
                init();
            }
        });
    });
}

