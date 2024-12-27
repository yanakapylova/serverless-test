import mysql from "mysql2/promise";
import { sayHello } from '@yanakapylova/npm-package-test';

// import pkg from "@yanakapylova/npm-package-test";
// const sayHello = pkg.sayHello; // Вытягиваем конкретную функцию

const dbConfig = {
  host: "localhost",
  database: "mydatabase",
  user: "yana",
  password: "qwerty",
};

export const createTable = async (event) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    await connection.query(`DROP TABLE IF EXISTS Employees;`);
    await connection.query(
      `CREATE TABLE Employees (EmployeeID INT PRIMARY KEY AUTO_INCREMENT, FirstName VARCHAR(50), LastName VARCHAR(50), Position VARCHAR(50));`
    );
    await connection.query(
      `INSERT INTO Employees (FirstName, LastName, Position)
      VALUES ('John', 'Doe', 'Software Engineer'), ('Jane', 'Smith', 'Product Manager');`
    );

    return {
      statusCode: 200,
      body: "table has been created successfully",
    };
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (event) => {
  // Get the client
  // Create the connection to database
  const connection = await mysql.createConnection(dbConfig);

  const [users, fields] = await connection.query(`SELECT * FROM Employees;`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      users,
    }),
  };
};

export const getUserById = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const params = event.pathParameters;

    const user = await connection.query(
      `SELECT * FROM Employees WHERE EmployeeID=${params.id};`
    );

    sayHello("name");

    return {
      statusCode: 200,
      body: JSON.stringify(user[0]),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err,
      }),
    };
  }
};

export const bye = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Bye Serverless v4! Your function executed successfully!",
    }),
  };
};
