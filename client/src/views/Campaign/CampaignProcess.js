import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";

import Icon from "./Icons/noun_right.svg";
import IconLeft from "./Icons/noun_left.svg";

class CampaignProcess extends React.Component {
  state = {
    response: [],
    show: false
  };

  componentDidMount() {
    this.callApi()
      .then(response => {
        this.setState({ response });
        console.log(response);
        // this.checkIfResponseExists(response);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/questions/process");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // checkIfResponseExists = array_of_response => {
  //   array_of_response.map(e => {
  //     fetch(`/api/check_response/${e.id_q}`)
  //       .then(function(results) {
  //         return results.json();
  //       })
  //       .then(function(myresults) {});
  //   });
  // };

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
        <Header />
        <h1>PROCESS</h1>
        <h3>Les bases</h3>
        {chapterWithQuestions.Process_bases.map(e => (
          <Link
            to={{
              pathname: `/campaign/question/${e.id_q}`,
              state: { questionName: e.intitule_q }
            }}
          >
            <Question
              onClick={this.showQuestion}
              textQuestion={e.intitule_q}
              key={e.id_q}
              number={e.id_q}
            />
          </Link>
        ))}

        <h3>Maîtriser vos livraisons</h3>
        {chapterWithQuestions.Process_maitriser.map(e => (
          <Link
            to={{
              pathname: `/campaign/question/${e.id_q}`,
              state: { questionName: e.intitule_q }
            }}
          >
            <Question
              textQuestion={e.intitule_q}
              key={e.id_q}
              number={e.id_q}
            />
          </Link>
        ))}

        <h3>Améliorer vos livraisons</h3>

        {chapterWithQuestions.Process_ameliorer.map(e => (
          <Link
            to={{
              pathname: `/campaign/question/${e.id_q}`,
              state: { questionName: e.intitule_q }
            }}
          >
            <Question
              textQuestion={e.intitule_q}
              key={e.id_q}
              number={e.id_q}
            />
          </Link>
        ))}
        <h3>Aider les équipes partenaires à améliorer leurs process</h3>

        {chapterWithQuestions.Process_aider.map(e => (
          <Link
            to={{
              pathname: `/campaign/question/${e.id_q}`,
              state: { questionName: e.intitule_q }
            }}
          >
            <Question
              textQuestion={e.intitule_q}
              key={e.id_q}
              number={e.id_q}
            />
          </Link>
        ))}
        <img
          style={{ display: "none" }}
          className="leftArrow"
          src={IconLeft}
          alt="leftarrow"
        />
        <Link to="/campaign/qualite">
          <img
            style={{ marginLeft: "50%" }}
            className="rightArrow"
            src={Icon}
            alt="rightarrow"
          />
        </Link>
      </Fragment>
    );
  }
}

export default CampaignProcess;
