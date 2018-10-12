import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";
import IconCheck from "./Icons/check2.png";
import Button from "../../components/Button/Button";

import "./Campaigns.css";

class CampaignValeurs extends React.Component {
  state = {
    response: [],
    currentCampaignId: sessionStorage.getItem("currentCampaignId")
  };

  componentDidMount() {
    this.callApi()
      .then(response => {
        this.setState({ response });
        // console.log(this.state.response);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(
      `/api/questions/valeur/${this.state.currentCampaignId}`
    );
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    if (!this.state.response || this.state.response.length == []) return null;
    const chapterWithQuestions = {};
    this.state.response.forEach(function(e) {
      if (!chapterWithQuestions[e.chapitre_q]) {
        chapterWithQuestions[e.chapitre_q] = [e];
      } else {
        chapterWithQuestions[e.chapitre_q].push(e);
      }
    });

    return (
      <Fragment>
        <Header
          header="header"
          className="buttonreturn"
          teamName={sessionStorage.getItem("currentFTName")}
          teamNameClass="header_team"
        />
        <h1>VALEURS</h1>

        <div className="campaignWrap">
          <h3 className="subtitle">Identifier la valeur</h3>
          {chapterWithQuestions.Valeur_identifier.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                  sourceIcon={IconCheck}
                />
              ) : (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                />
              )}
            </Link>
          ))}

          <h3 className="subtitle">Se concentrer sur la valeur</h3>
          {chapterWithQuestions.Valeur_concentrer.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                  sourceIcon={IconCheck}
                />
              ) : (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                />
              )}
            </Link>
          ))}

          <h3 className="subtitle">Livrer de la valeur</h3>

          {chapterWithQuestions.Valeur_livrer.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                  sourceIcon={IconCheck}
                />
              ) : (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                />
              )}
            </Link>
          ))}
          <h3 className="subtitle">Optimiser la valeur</h3>
          {chapterWithQuestions.Valeur_optimiser.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                  sourceIcon={IconCheck}
                />
              ) : (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                />
              )}
            </Link>
          ))}
          <h3 className="subtitle">De la valeur innovante</h3>

          {chapterWithQuestions.Valeur_innovante.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                  sourceIcon={IconCheck}
                />
              ) : (
                <Question
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                />
              )}
            </Link>
          ))}
        </div>
        <div className="miniwrapButton">
          <Link to="/themes">
            <Button
              textButton="VALIDER LA PARTIE VALEURS"
              classButton="ValideBtn"
            />
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default CampaignValeurs;
