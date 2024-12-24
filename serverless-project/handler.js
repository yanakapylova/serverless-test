// Require and initialize outside of your main handler
const mysql = require("serverless-mysql")({
  config: {
    // host     : process.env.ENDPOINT,
    // database : process.env.DATABASE,
    // user     : process.env.USERNAME,
    // password : process.env.PASSWORD

    // host: "localhost",
    // database: "mydatabase",
    // user: "yana",
    // password: "qwerty",

    host: "junction.proxy.rlwy.net",
    // user: "root",
    password: "cHqxRsKaZxDscAKVHlnTQMKjbAAJqQHr",
    database: "railway",
    port: 59391,
  },
});
// Main handler function
exports.db = async (event, context) => {
  // Run your query
  let results = await mysql.query("SELECT * FROM table");
  // Run clean up function
  await mysql.end();
  // Return the results
  return results;
};

let createDBCode = `-- Создание таблицы
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Position VARCHAR(50),
    Salary DECIMAL(10, 2)
);

-- Вставка данных
INSERT INTO Employees (FirstName, LastName, Position, Salary)
VALUES 
('John', 'Doe', 'Software Engineer', 75000.00),
('Jane', 'Smith', 'Product Manager', 85000.00);

-- Проверка вставленных данных
SELECT * FROM Employees;
`;

exports.create_db = async (event, context) => {
  // Run your query
  await mysql.query(createDBCode);
  // Run clean up function
  await mysql.end();
};

exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
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
