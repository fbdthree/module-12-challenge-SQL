const inquirer = require("inquirer")
const mysql = require("mysql2")
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3003;

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


function viewAllDepartments() {
    db.query("SELECT * FROM DEPARTMENT;", function (err, dbrecords) {
        if (err) console.log(err)
        console.table(dbrecords)
        init()
    })
}

function viewAllEmployees() {
    db.query("SELECT * FROM EMPLOYEES", function (err, dbrecords) {
        if (err) console.log(err)
        console.table(dbrecords)
        init()
    })
}

function viewAllRoles() {
    db.query("SELECT * FROM ROLES;", function (err, dbrecords) {
        if (err) console.log(err)
        console.table(dbrecords)
        init()
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type:"input",
            message:"Please enter additional department: ",
            name:"additionalDepartment"
        }
    ]).then(response =>{
        const additionalDepartment = response.additionalDepartment
        db.query(`INSERT INTO DEPARTMENT (department_name) VALUES ("${additionalDepartment}")`, function(err,result){
            if(err) console.log(err)
            console.log(`You have successfully created the ${additionalDepartment}.`)
            init();
        })
    })
}

