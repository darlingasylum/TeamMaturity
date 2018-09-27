const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 5000;

// database.test();

// app.get("/home", (req, res) => {
//   connection.query("SELECT * FROM feature_team", function(
//     error,
//     results,
//     fields
//   ) {
//     if (error) throw error;
//     console.log(results);
//     res.send({ results: results });
//   });
// });

app.get("/api/teams", function(req, res) {
  database.getTeam(function(err, dataset) {
    // console.log(dataset);
    res.send(dataset);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
