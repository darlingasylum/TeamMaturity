const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MDPmysqlLBC!",
  database: "maturity"
});

connection.connect(function(err) {
  //   console.error(err);
  //   console.log("connected as id " + connection.threadId);
});

const end = () => {
  connection.end();
};

// const test = () => {
//   connection.query("SELECT 1 + 1 AS solution", function(error, results) {
//     if (error) throw error;
//     console.log("The solution is: ", results[0].solution);
//   });
// };

const getTeam = clbk => {
  connection.query("SELECT * FROM feature_team", function(
    error,
    results,
    fields
  ) {
    if (error) return clbk(error, null);
    return clbk(null, results);
  });
};

// connection.query("SELECT * FROM feature_team", function(
//   error,
//   results,
//   fields
// ) {
//   if (error) throw error;
//   results.forEach(result => {
//     console.log(result);
//   });
// });

module.exports = {
  getTeam,
  //   test,
  end
};
