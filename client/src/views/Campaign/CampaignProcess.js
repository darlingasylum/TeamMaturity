import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";
import Button from "../../components/Button/Button";
import IconCheck from "./Icons/check2.png";

import "./Campaigns.css";

class CampaignProcess extends React.Component {
  state = {
    response: [],
    show: false,
    currentCampaignId: sessionStorage.getItem("currentCampaignId")
  };

  componentDidMount() {
    this.callApi()
      .then(response => {
        //console.log(response);
        this.setState({ response });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(
      `/api/questions/process/${this.state.currentCampaignId}`
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
    //console.log(chapterWithQuestions);

    return (
      <Fragment>
        <Header
          header="header"
          className="buttonreturn"
          teamName={sessionStorage.getItem("currentFTName")}
          teamNameClass="header_team"
        />
        <h1>PROCESS</h1>

        <div className="campaignWrap">
          <h3 className="subtitle">Les bases</h3>
          {chapterWithQuestions.Process_bases.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  onClick={this.showQuestion}
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  sourceIcon={IconCheck}
                  number={e.id_q}
                />
              ) : (
                <Question
                  onClick={this.showQuestion}
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                />
              )}
            </Link>
          ))}

          <h3 className="subtitle">Maîtriser vos livraisons</h3>
          {chapterWithQuestions.Process_maitriser.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  onClick={this.showQuestion}
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  sourceIcon={IconCheck}
                  number={e.id_q}
                />
              ) : (
                <Question
                  onClick={this.showQuestion}
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                />
              )}
            </Link>
          ))}

          <h3 className="subtitle">Améliorer vos livraisons</h3>

          {chapterWithQuestions.Process_ameliorer.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  onClick={this.showQuestion}
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  sourceIcon={IconCheck}
                  number={e.id_q}
                />
              ) : (
                <Question
                  onClick={this.showQuestion}
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  number={e.id_q}
                />
              )}
            </Link>
          ))}
          <h3 className="subtitle">
            Aider les équipes partenaires à améliorer leurs process
          </h3>

          {chapterWithQuestions.Process_aider.map(e => (
            <Link
              to={{
                pathname: `/campaign/question/${e.id_q}`,
                state: { questionName: e.intitule_q }
              }}
            >
              {typeof e.reponse_r === "number" ? (
                <Question
                  onClick={this.showQuestion}
                  textQuestion={e.intitule_q}
                  key={e.id_q}
                  sourceIcon={IconCheck}
                  number={e.id_q}
                />
              ) : (
                <Question
                  onClick={this.showQuestion}
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
              textButton="VALIDER LA PARTIE PROCESS"
              classButton="ValideBtn"
            />
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default CampaignProcess;
