const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MDPmysqlLBC!",
  database: "maturity"
});

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/hello", (req, res) => {
  connection.query("SELECT * FROM feature_team", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log(results);
    res.send({ results: results });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
