// Ashley Timko | TCSS 445 | Assign3 | Controllers | employee.js
// 05/09/25, This file gets the employee details
const db = require('../dbConfig');

/**
 *  The getEmployeeByLastName function in a Node.js application retrieves employee data by
 *  last name from a database and generates am HTML response for display.
 *  It uses the db.query method to execute a SQL query and handles errors gracefully.
 */
const getEmployeeByLastName = (req, res) => {
    const lastName = req.query.lastName; // Get last name from query parameter
    const query = 'SELECT Fname, Lname, Ssn, Salary, Bdate FROM EMPLOYEE WHERE Lname = ?';

    db.query(query, [lastName], (err, results) => {

        if(err) {
            return res.status(500).send('Error fetching employee data');
        }
        // Generate HTML response
        let html = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/superhero/bootstrap.min.css">
            <div class="container mt-5">
                <h3>Employee Details for Last Name: ${lastName}</h3>
        `;

        if(results.length === 0) {
            html += `<p>No results found.</p>`;
        }
        else {
            html += `
                <table class="table table-bordered table-striped mt-3">
                    <thead class="table-dark fs-5 fw-bold text-white">
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>SSN</th>
                            <th>Salary</th>
                            <th>Birthdate</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
                results.forEach(emp => {
                    html += `
                        <tr>
                            <td>${emp.Lname}</td>
                            <td>${emp.Fname}</td>
                            <td>${emp.Ssn}</td>
                            <td>${emp.Salary}</td>
                            <td>${new Date(emp.Bdate).toLocaleDateString()}</td>
                        </tr>
                    `;
                });
                html += `
                    </tbody>
                </table>    
                `;
            }
            html += `
                <a href="/employee.html" class="btn btn-primary mt-3">Back to Search</a>
            </div>
            `;

            res.send(html); // Send the generated HTML as the response
        });
    };

/**
 *  module.exports enables parts of the code to be accessible outside the file.
 *  Here, it exports the getEmployeeByLastName function, allowing it to be imported.
 */
module.exports = {
    getEmployeeByLastName,
};