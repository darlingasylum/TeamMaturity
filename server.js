const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/teams", function(req, res) {
  database.getTeam(function(err, dataset) {
    // console.log(dataset);
    res.send(dataset);
  });
});

app.post("/api/campaign-name", function(req, res) {
  console.log(req.body);
  database.postCampaignName(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
