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

const postCampaignName = (clbk, data) => {
  console.log("je suis dans DB");
  const q = "INSERT INTO campagnes(nom_camp, id_ft_camp) VALUES (?, ?)";
  const payload = [data.nom_campagne, data.id_ft];
  console.log(payload);
  connection.query(q, payload, function(error, results, cols) {
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
  end
};
