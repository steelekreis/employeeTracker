const db = require('./db');
const inquirer = require('inquirer');
require('console.table');


const Menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add a Employee',
                'Update an Employee\'s Role',
                'Done'
            ]
        }
    ]).then(res => {
            switch (res.menu) {
                case 'View All Departments':
                    return viewAllDepartments();
                case 'View All Roles':
                    return viewAllRoles();
                case 'View All Employees':
                    return viewAllEmployees();
                case 'Add a Department':
                    return addDepartment();
                case 'Add a Role':
                    return addRole();
                case 'Add a Employee':
                    return addEmployee();
                case 'Update an Employee\'s Role':
                    return updateEmployeeRole();
                case 'Done':
                    return process.exit();
            }
        });
};

async function viewAllDepartments() {
    const [department] = await db.viewAllDepartments();
    console.table(department);
    Menu();
};

async function viewAllRoles() {
    const [roles] = await db.viewAllRoles();
    console.table(roles);
    Menu();
};

async function viewAllEmployees() {
    const [employees] = await db.viewAllEmployees();
    console.table(employees);
    Menu();
};


async function addDepartment() {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name of the new department?'
        }
    ])
    db.addDepartment(department);
    console.log(`Added ${department} to the database.`);
    Menu();
};

async function addRole() {
    const [department] = await db.viewAllDepartments();
    const departmentChoices = department.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title for this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department should this role assigned to?',
            choices: departmentChoices
        }
    ]);
    await db.addRole(role);
    console.log(`Added ${role.title} to the database`);
    Menu();
}

async function addEmployee() {
    const [role] = await db.viewAllRoles();
    const roleChoices = role.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the role of the employee?',
            choices: roleChoices
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What is the ID of the employee\'s manager? If this employee is a manager and/or does not have one, please press ENTER to continue'
        }
    ]);
    await db.addEmployee(employee);
    console.log(`Added ${employee.first_name} ${employee.last_name} to the database`);
    Menu();
}

async function updateEmployeeRole() {
    const [employee] = await db.viewAllEmployees();
    const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const [role] = await db.viewAllRoles();
    const roleChoices = role.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId, employeeId} = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee needs a role change?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Which role now belongs to this employee?',
            choices: roleChoices
        }
    ]);
    await db.updateEmployeeRole(employeeId, roleId);
    console.log(`This employee's role has been updated in the database.`);
    Menu();
};

Menu();