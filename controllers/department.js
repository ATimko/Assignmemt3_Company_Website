// Ashley Timko | TCSS 445 | Assign3 | Controllers | department.js
// 05/09/25, This file gets the department details
const db = require('../dbConfig');

/**
* The getDepartmentDetails function is responsible for retrieving
* detailed information about a specific department from a database.
*/
    const getDepartmentDetails = (req, res) => {
        const departmentName = req.query.departmentName;
        const query = `
        SELECT d.Dname AS DepartmentName, d.Mgr_start_date AS ManagerStartDate,
            e.Fname AS ManagerFirstName, e.Lname AS ManagerLastName, e.Salary AS ManagerSalary
        FROM DEPARTMENT d
        JOIN EMPLOYEE e ON d.Mgr_ssn = e.Ssn
        WHERE d.Dname = ?
    `;
    /**
        * Create a callback function that handles the response from the db.query method.
        * It checks for errors and returns an appropriate response based on the query results.
        * If an error occurs, it sends a 500 status code with an error message.
        * If no department is found, it sends a 404 status code with a message.
        * Otherwise, it sends a 200 status code with the department details.
    */
    db.query(query, [departmentName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching department data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No department found with that name' });
        }
        res.json(results[0]);
    });
};
module.exports = {
    getDepartmentDetails,
};
