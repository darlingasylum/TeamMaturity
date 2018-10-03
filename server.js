const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MDPmysqlLBC!",
  database: "maturity"
});

// RECUPERE LE NOM DES FT
app.get("/api/teams", function(req, res) {
  database.getTeam(function(err, dataset) {
    // console.log(dataset);
    res.send(dataset);
  });
});

//POSTE LE NOM D'UNE NOUVELLE CAMPAGNE
app.post("/api/campaign-name", function(req, res) {
  // console.log(req.body);
  database.postCampaignName(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});

//RECUPERE LES QUESTIONS "PROCESS"
app.get("/api/questions/process", function(req, res) {
  database.getProcessQuestions(function(err, dataset) {
    //console.log("server questions");
    res.send(dataset);
  });
});

//RECUPERE LES QUESTIONS "QUALITE"
app.get("/api/questions/qualite", function(req, res) {
  database.getQualityQuestions(function(err, dataset) {
    //console.log("server questions");
    res.send(dataset);
  });
});

//RECUPERE LES QUESTIONS "VALEUR"
app.get("/api/questions/valeur", function(req, res) {
  database.getValueQuestions(function(err, dataset) {
    // console.log("server questions");
    res.send(dataset);
  });
});

// RECUPERE L'INTITULE DE CHAQUE QUESTION AU CLIC
app.get("/api/questions/:id_q", function(req, res) {
  var id_q = req.params.id_q;
  database.getQuestion(id_q, function(err, dataset) {
    res.send(dataset);
  });
});

// RECUPERE L'ID DE LA CAMPAGNE (nécessaire au POST des réponses)
app.get("/api/campaign_id/:id_ft/:campaign_name", function(req, res) {
  var campaign_name = req.params.campaign_name;
  var id_ft = req.params.id_ft;
  database.getCampaignId(id_ft, campaign_name, function(err, dataset) {
    res.send(dataset);
  });
});

//POSTE LES REPONSES à UNE QUESTION
app.post("/api/send_response", function(req, res) {
  database.send_response(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});

// CHANGE LE STATUT DE LA CAMPAGNE AU CLIC SUR VALIDER
app.post("/api/changeStatusCampaign", function(req, res) {
  database.changeStatusCampaign(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
