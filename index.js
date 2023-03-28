const { prompt } = require("inquirer");
const db = require("./db/connection");

const viewAllDepartments = () => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};

const viewAllRoles = () => {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};

const viewAllEmployees = () => {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};

const addDepartment = () => {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((answer) => {
    db.query(
      "INSERT INTO department (name) VALUES (?)",
      answer.name,
      (err, results) => {
        if (err) throw err;
        console.log("Department added!");
        start();
      }
    );
  });
};

const addRole = () => {
  prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role?",
    },
    {
      type: "input",
      name: "department_id",
      message: "What is the department id of the role?",
    },
  ]).then((answer) => {
    db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [answer.title, answer.salary, answer.department_id],
      (err, results) => {
        if (err) throw err;
        console.log("Role added!");
        start();
      }
    );
  });
};

const addEmployee = () => {
  prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the employee?",
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the role id of the employee?",
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the manager id of the employee?",
    },
  ]).then((answer) => {
    db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
      (err, results) => {
        if (err) throw err;
        console.log("Employee added!");
        start();
      }
    );
  });
};

const updateEmployeeRole = () => {
  prompt([
    {
      type: "input",
      name: "id",
      message: "What is the id of the employee?",
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the new role id of the employee?",
    },
  ]).then((answer) => {
    db.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [answer.role_id, answer.id],
      (err, results) => {
        if (err) throw err;
        console.log("Employee role updated!");
        start();
      }
    );
  });
};

const start = () => {
  console.log("Welcome to the Employee Manager!");
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    },
  ]).then((answer) => {
    switch (answer.choice) {
      case "View all departments":
        viewAllDepartments();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployeeRole();
        break;
      case "Exit":
        db.end();
        break;
    }
  });
};

start();
