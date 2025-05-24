// Ashley Timko | TCSS 445 | Assign3 | Controllers | projectHours.js
// 05/09/25, This file gets the project hour details
const db = require('../dbConfig');

/**
 * getProjectHourDetails retrieves department and project data where employees have worked
 * more than a specified number of hours. It returns:
 * - Department name
 * - Department manager's full name
 * - Project name
 * - Number of employees working on the project
 * - Total hours worked on that project
 */
const getProjectHourDetails = (req, res) => {
    //Tries to get the minimum hours from query parameters
    const minHours = parseFloat(req.query.minHours) || 20; // Min default 20

    // SQL query statement that joins DEPARTMENT, EMPLOYEE (manager), PROJECT, and WORKS_ON tables
    const query = `
        SELECT 
            d.Dname AS DepartmentName,
            d.Dnumber AS DepartmentNumber,
            CONCAT(m.Fname, ' ', m.Lname) AS ManagerName,
            p.Pname AS ProjectName,
            COUNT(DISTINCT w.Essn) AS NumEmployees,
            SUM(w.Hours) AS TotalHours
        FROM DEPARTMENT d
        JOIN EMPLOYEE m ON d.Mgr_ssn = m.Ssn
        JOIN PROJECT p ON d.Dnumber = p.Dnum
        JOIN WORKS_ON w ON p.Pnumber = w.Pno
        GROUP BY d.Dname, d.Dnumber, ManagerName, p.Pname
        HAVING SUM(w.Hours) > ?
        ORDER BY d.Dname, p.Pname;
    `;

    db.query(query, [minHours], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching project hours data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No project hours found with that name or number' });
        }
        res.json(results);
    });
};
// Export an object containing the getProjectDetails function from the project.js file.
module.exports = {
    getProjectHourDetails,
};