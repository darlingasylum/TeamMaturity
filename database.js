const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MDPmysqlLBC!",
  database: "maturity"
});

connection.connect(function(err) {});

const end = () => {
  connection.end();
};

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

// VERIFIE SI UNE CAMPAGNE DE STATUT ZERO EXISTE
const getCurrentCampaign = (id_ft, clbk) => {
  connection.query(
    `SELECT * FROM campagnes WHERE id_ft_camp=${id_ft} AND statut_camp=0`,
    function(error, results, fields) {
      //console.log(results);
      if (error) return clbk(error, null);
      return clbk(null, results);
    }
  );
};

// const getCurrentCampaign = (id_ft, clbk) => {
//   connection.query(
//     `SELECT * FROM campagnes WHERE id_ft_camp=${id_ft}`,
//     function(error, results, fields) {
//       //console.log(results);
//       if (error) return clbk(error, null);
//       return clbk(null, results);
//     }
//   );
// };

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
const getProcessQuestions = (currentCampaignId, clbk) => {
  //console.log("je suis dans DB questions");
  connection.query(
    `SELECT * FROM questions LEFT JOIN resultats ON questions.id_q = resultats.id_q_r AND id_camp_r = ${currentCampaignId} WHERE chapitre_q LIKE 'Process%'`,
    //et envoyer les réponses qui existent déjà. s
    function(error, results, fields) {
      // console.log(results);
      if (error) return clbk(error, null);
      return clbk(null, results);
    }
  );
};

//RECUPERE LES QUESTIONS "QUALITE"
const getQualityQuestions = (currentCampaignId, clbk) => {
  console.log(currentCampaignId);
  connection.query(
    `SELECT * FROM questions LEFT JOIN resultats ON questions.id_q = resultats.id_q_r AND id_camp_r = ${currentCampaignId} WHERE chapitre_q = 'Qualité'`,
    function(error, results, fields) {
      //console.log(results);
      if (error) return clbk(error, null);
      return clbk(null, results);
    }
  );
};

//RECUPERE LES QUESTIONS "VALEUR"
const getValueQuestions = (currentCampaignId, clbk) => {
  connection.query(
    `SELECT * FROM questions LEFT JOIN resultats ON questions.id_q = resultats.id_q_r AND id_camp_r = ${currentCampaignId} WHERE chapitre_q LIKE 'Valeur%'`,
    function(error, results, fields) {
      if (error) return clbk(error, null);
      return clbk(null, results);
    }
  );
};

//RECUPERE L'INTITULE D'UNE QUESTION AU CLIC
const getQuestion = (id_q, clbk) => {
  // console.log("je suis dans DB questions");
  connection.query(`SELECT * FROM questions WHERE id_q=${id_q}`, function(
    error,
    results,
    fields
  ) {
    // console.log(results);
    if (error) return clbk(error, null);
    return clbk(null, results);
  });
};

// RECUPERE L'ID DE LA CAMPAGNE (nécessaire au POST des réponses)
const getCampaignId = (id_ft, campaign_name, clbk) => {
  connection.query(
    `SELECT * FROM campagnes WHERE id_ft_camp=${id_ft} AND nom_camp='${campaign_name}' AND statut_camp=0`,
    function(error, results, fields) {
      // console.log(results);
      if (error) return clbk(error, null);
      return clbk(null, results);
    }
  );
};

// POST LES RESULTATS DES QUESTIONS OU UPDATE SI UNE REPONSE EXISTE DEJA
const send_response = (clbk, data) => {
  const payload = [
    data.id_camp_r,
    data.id_q_r,
    data.reponse_r,
    data.commentaire_r
  ];
  connection.query(
    `SELECT * FROM resultats WHERE id_camp_r = ${data.id_camp_r} AND id_q_r = ${
      data.id_q_r
    }`,
    function(error, results, cols) {
      if (results.length !== 0) {
        console.log("ma réponse existe déjà");
        const sql_update = `UPDATE resultats
        SET reponse_r = ${data.reponse_r}, commentaire_r = '${
          data.commentaire_r
        }' WHERE id_camp_r = ${data.id_camp_r} AND id_q_r = ${data.id_q_r}`;

        connection.query(sql_update, payload, function(error, results, cols) {
          // console.log(error);
          // console.log(results);
          // console.log(cols);
          if (error) return clbk(error, null);
          return clbk(null, results);
        });
      } else {
        const sql =
          "INSERT INTO resultats(id_camp_r, id_q_r, reponse_r, commentaire_r) VALUES (?, ?, ?, ?)";

        connection.query(sql, payload, function(error, results, cols) {
          // console.log(error);
          // console.log(results);
          // console.log(cols);
          if (error) return clbk(error, null);
          return clbk(null, results);
        });
      }
    }
  );
};

// CHANGE LE STATUT DE LA CAMPAGNE AU CLIC SUR VALIDER
const changeStatusCampaign = (clbk, data) => {
  const q = `UPDATE campagnes SET statut_camp=1 WHERE id_ft_camp=${
    data.id_ft
  } AND id_camp=${data.id_camp}`;
  const payload = [data.id_ft, data.id_camp];
  //console.log(payload);
  connection.query(q, payload, function(error, results, cols) {
    // console.log(error);
    // console.log(results);
    // console.log(cols);
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
  getQuestion,
  getCampaignId,
  send_response,
  changeStatusCampaign,
  getCurrentCampaign,
  end
};
