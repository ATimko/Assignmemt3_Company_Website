// Ashley Timko | TCSS 445 | Assign3 | Server.js
// Created on 05/09/25
// Main file (The heart of the program)
const express = require('express');
const db = require('./dbConfig');
const employeeController = require('./controllers/employee');
const departmentController = require('./controllers/department');
const projectController = require('./controllers/project');
const projectHourController = require('./controllers/projectHour');

/**
 *  Configure the Express application and middleware for handling
 *  JSON requests and serving static files from the 'public' directory.
 */
const app = express();
app.use(express.json());
app.use(express.static('public'));

/**
 *  Create the routes for the Express application.
 *  It defines three GET routes, each corresponding to a specific controller:
 */
app.get('/employee', employeeController.getEmployeeByLastName);
app.get('/department', departmentController.getDepartmentDetails);
app.get('/project', projectController.getProjectDetails);
app.get('/projectHour', projectHourController.getProjectHourDetails);

/**
 *  Configure the server to listen on a specified port (5000). It uses the process.env.PORT environment variable to
 *  determine the port number. If process.env.PORT is not defined, it defaults to 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});