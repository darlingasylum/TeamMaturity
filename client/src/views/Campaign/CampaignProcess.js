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
        // console.log(this.state.response);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/questions/process");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // showQuestion = event => {
  //   this.setState({ show: !this.state.show });
  //   console.log("ça marche");
  //   console.log(event.target.value);
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
          <Question textQuestion={e.intitule_q} key={e.id_q} number={e.id_q} />
        ))}

        <h3>Améliorer vos livraisons</h3>

        {chapterWithQuestions.Process_ameliorer.map(e => (
          <Question textQuestion={e.intitule_q} key={e.id_q} number={e.id_q} />
        ))}
        <h3>Aider les équipes partenaires à améliorer leurs process</h3>

        {chapterWithQuestions.Process_aider.map(e => (
          <Question textQuestion={e.intitule_q} key={e.id_q} number={e.id_q} />
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
