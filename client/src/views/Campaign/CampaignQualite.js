import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";
import Icon from "./Icons/noun_right.svg";
import IconLeft from "./Icons/noun_left.svg";

class CampaignQualite extends React.Component {
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
    const response = await fetch("/api/questions/qualite");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <Fragment>
        <Header />
        <h1>QUALITE</h1>
        {this.state.response.map(e => (
          <Question textQuestion={e.intitule_q} key={e.id_q} number={e.id_q} />
        ))}
        <Link to="/campaign/process">
          <img className="leftArrow" src={IconLeft} alt="leftarrow" />
        </Link>
        <Link to="/campaign/valeurs">
          <img className="rightArrow" src={Icon} alt="rightarrow" />{" "}
        </Link>
      </Fragment>
    );
  }
}

export default CampaignQualite;
