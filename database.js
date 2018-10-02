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

// RECUPERE LE NOM DES FT
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

//POSTE LE NOM D'UNE NOUVELLE CAMPAGNE
const postCampaignName = (clbk, data) => {
  const q = "INSERT INTO campagnes(nom_camp, id_ft_camp) VALUES (?, ?)";
  const payload = [data.nom_campagne, data.id_ft];
  //console.log(payload);
  connection.query(q, payload, function(error, results, cols) {
    // console.log(error);
    // console.log(results);
    // console.log(cols);
    if (error) return clbk(error, null);
    return clbk(null, results);
  });
};

//RECUPERE LES QUESTIONS "PROCESS"
const getProcessQuestions = clbk => {
  //console.log("je suis dans DB questions");
  connection.query(
    "SELECT * FROM questions WHERE chapitre_q LIKE 'Process%'",
    function(error, results, fields) {
      if (error) return clbk(error, null);
      return clbk(null, results);
    }
  );
};

//RECUPERE LES QUESTIONS "QUALITE"
const getQualityQuestions = clbk => {
  //console.log("je suis dans DB questions");
  connection.query(
    "SELECT * FROM questions WHERE chapitre_q LIKE 'Qualité%'",
    function(error, results, fields) {
      // console.log(results);
      if (error) return clbk(error, null);
      return clbk(null, results);
    }
  );
};

//RECUPERE LES QUESTIONS "VALEUR"
const getValueQuestions = clbk => {
  connection.query(
    "SELECT * FROM questions WHERE chapitre_q LIKE 'Valeur%'",
    function(error, results, fields) {
      if (error) return clbk(error, null);
      return clbk(null, results);
    }
  );
};

//RECUPERE L'INTITULE D'UNE QUESTION PRECISE'
// const getQuestion = clbk => {
//   console.log("je suis dans DB questions");
//   connection.query(`SELECT * FROM questions WHERE id_q=${id_q}`, function(
//     error,
//     results,
//     fields
//   ) {
//     console.log(results);
//     if (error) return clbk(error, null);
//     return clbk(null, results);
//   });
// };

// RECUPERE L'ID DE LA CAMPAGNE (nécessaire au POST des réponses)
// const getCampaignId = clbk => {
//   connection.query(
//     "SELECT id_camp FROM campagnes WHERE statut_camp = 0",
//     function(error, results, fields) {
//       console.log(results);
//       if (error) return clbk(error, null);
//       return clbk(null, results);
//     }
//   );
// };

//POSTE LES REPONSES à UNE QUESTION
const send_response = (clbk, data) => {
  const sql =
    "INSERT INTO resultats(id_camp_r, id_q_r, reponse_r, commentaire_r) VALUES (?, ?, ?, ?)";
  const payload = [
    data.id_camp_r,
    data.id_q_r,
    data.reponse_r,
    data.commentaire_r
  ];

  connection.query(sql, payload, function(error, results, cols) {
    console.log(error);
    console.log(results);
    console.log(cols);
    if (error) return clbk(error, null);
    return clbk(null, results);
  });
};

module.exports = {
  getTeam,
  postCampaignName,
  getProcessQuestions,
  getQualityQuestions,
  getValueQuestions,
  // getQuestion,
  // getCampaignId,
  send_response,
  end
};
