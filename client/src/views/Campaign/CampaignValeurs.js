import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";
import Icon from "./Icons/noun_right.svg";
import IconLeft from "./Icons/noun_left.svg";

class CampaignValeurs extends React.Component {
  state = {
    response: []
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
    const response = await fetch("/api/questions/valeur");
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
        <Header />
        <h1>VALEURS</h1>
        <h3>Identifier la valeur</h3>
        {console.log(chapterWithQuestions.Valeur_identifier)}
        {chapterWithQuestions.Valeur_identifier.map(e => (
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

        <h3>Se concentrer sur la valeur</h3>
        {chapterWithQuestions.Valeur_concentrer.map(e => (
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
            />{" "}
          </Link>
        ))}

        <h3>Livrer de la valeur</h3>

        {chapterWithQuestions.Valeur_livrer.map(e => (
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
            />{" "}
          </Link>
        ))}
        <h3>Optimiser la valeur</h3>
        {chapterWithQuestions.Valeur_optimiser.map(e => (
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
            />{" "}
          </Link>
        ))}
        <h3>De la valeur innovante</h3>

        {chapterWithQuestions.Valeur_innovante.map(e => (
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
            />{" "}
          </Link>
        ))}
        <img className="leftArrow" src={IconLeft} alt="leftarrow" />
        <Link to="/campaign/qualite">
          <img
            style={{ display: "none" }}
            className="rightArrow"
            src={Icon}
            alt="rightarrow"
          />
        </Link>
      </Fragment>
    );
  }
}

export default CampaignValeurs;
