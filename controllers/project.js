// Ashley Timko | TCSS 445 | Assign3 | Controllers | project.js
// 05/09/25, This file gets the project details
const db = require('../dbConfig');

// getProjectDetails is responsible for retrieving project details based on a given project name.
const getProjectDetails = (req, res) => {
    const projectName = req.query.projectName; // Get project name from query parameter
    const query = `
    SELECT p.Pname AS ProjectName, w.Hours AS HoursWorked,
            e.Fname AS EmployeeFirstName, e.Lname AS EmployeeLastName, e.Ssn AS EmployeeSSN
    FROM PROJECT p
    JOIN WORKS_ON w ON p.Pnumber = w.Pno
    JOIN EMPLOYEE e ON w.Essn = e.Ssn
    WHERE p.Pname = ?
    `;

    db.query(query, [projectName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching project data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No project found with that name' });
        }
        res.json(results);
    });
};
// Export an object containing the getProjectDetails function from the project.js file.
module.exports = {
    getProjectDetails,
};
