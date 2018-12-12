const express = require("express");
const database = require("./database");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5555;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HOME : RECUPERE LE NOM DES FT
app.get("/api/teams", function(req, res) {
  database.getTeam(function(err, dataset) {
    // console.log(dataset);
    res.send(dataset);
  });
});

// BOARD : RECUPERE LES CAMPAGNES EN COURS OU PASSEES
app.get("/api/getCampaigns/:id_ft", function(req, res) {
  const id_ft = req.params.id_ft;
  database.getCampaigns(id_ft, function(err, dataset) {
    // console.log(dataset);
    res.send(dataset);
  });
});

// BOARD : RECUPERE LE NOM DE LA FT
app.get("/api/getFTName/:id_ft", function(req, res) {
  const id_ft = req.params.id_ft;
  database.getFTName(id_ft, function(err, dataset) {
    // console.log(dataset);
    res.send(dataset);
  });
});

//BOARD DIALOG : POSTE LE NOM D'UNE NOUVELLE CAMPAGNE
app.post("/api/campaign-name", function(req, res) {
  // console.log(req.body);
  database.postCampaignName(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});

//CAMPAIGN : RECUPERE LES QUESTIONS "PROCESS"
app.get("/api/questions/process/:currentCampaignId", function(req, res) {
  var currentCampaignId = req.params.currentCampaignId;
  database.getProcessQuestions(currentCampaignId, function(err, dataset) {
    //console.log("server questions");
    res.send(dataset);
  });
});

//CAMPAIGN : RECUPERE LES QUESTIONS "QUALITE"
app.get("/api/questions/qualite/:currentCampaignId", function(req, res) {
  var currentCampaignId = req.params.currentCampaignId;
  database.getQualityQuestions(currentCampaignId, function(err, dataset) {
    //console.log("server questions");
    res.send(dataset);
  });
});

//CAMPAIGN : RECUPERE LES QUESTIONS "VALEUR"
app.get("/api/questions/valeur/:currentCampaignId", function(req, res) {
  var currentCampaignId = req.params.currentCampaignId;
  database.getValueQuestions(currentCampaignId, function(err, dataset) {
    // console.log("server questions");
    res.send(dataset);
  });
});

// THEMES : RECUPERE L'ID DE LA CAMPAGNE (nécessaire au POST des réponses)
app.get("/api/campaign_id/:id_ft/:campaign_name", function(req, res) {
  var campaign_name = req.params.campaign_name;
  var id_ft = req.params.id_ft;

  database.getCampaignId(id_ft, campaign_name, function(err, dataset) {
    res.send(dataset);
  });
});

// QUESTIONDIALOG : RECUPERE L'INTITULE DE CHAQUE QUESTION AU CLIC
app.get("/api/questions/:id_q", function(req, res) {
  var id_q = req.params.id_q;
  database.getQuestion(id_q, function(err, dataset) {
    res.send(dataset);
  });
});

// QUESTIONDIALOG : POSTE LES REPONSES à UNE QUESTION OU UPDATE SI UNE REPONSE EXISTE DEJA
app.post("/api/send_response", function(req, res) {
  database.send_response(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});

// THEMES : CHANGE LE STATUT DE LA CAMPAGNE AU CLIC SUR VALIDER
app.post("/api/changeStatusCampaign", function(req, res) {
  database.changeStatusCampaign(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});

//RESULTS : RECUPERE LES ID DES 3 CAMPAGNES N, N-1, N-2
app.get("/api/get3campaigns/:id_ft/:currentCampaignId", function(req, res) {
  const id_ft = req.params.id_ft;
  const currentCampaignId = req.params.currentCampaignId;
  database.get3campaigns(id_ft, currentCampaignId, function(err, dataset) {
    // console.log("server questions");
    res.send(dataset);
  });
});

//RESULTS : RECUPERE LES RESULTATS DE LA CAMPAGNE N
app.get("/api/results_n/:currentCampaignId", function(req, res) {
  const currentCampaignId = req.params.currentCampaignId;
  database.getResultsN(currentCampaignId, function(err, dataset) {
    // console.log("server questions");
    res.send(dataset);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
