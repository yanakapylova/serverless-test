const mysql = require("mysql2/promise");
exports.hello = async (event) => {
  // Get the client

  // Create the connection to database
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "mydatabase",
    user: "yana",
    password: "qwerty",
  });

  // A simple SELECT query''
  let users;
  try {
    await connection.query(`DROP TABLE IF EXISTS Employees;`);
    await connection.query(
      `CREATE TABLE Employees (EmployeeID INT PRIMARY KEY AUTO_INCREMENT, FirstName VARCHAR(50), LastName VARCHAR(50), Position VARCHAR(50));`
    );
    await connection.query(
      `INSERT INTO Employees (FirstName, LastName, Position)
      VALUES ('John', 'Doe', 'Software Engineer'), ('Jane', 'Smith', 'Product Manager');`
    );
    const [results, fields] = await connection.query(
      `SELECT * FROM Employees;`
    );

    users = results;
    // console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
      users: users,
    }),
  };
};

exports.bye = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Bye Serverless v4! Your function executed successfully!",
    }),
  };
};
