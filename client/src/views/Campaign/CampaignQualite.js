import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";
import IconCheck from "./Icons/check2.png";

class CampaignQualite extends React.Component {
  state = {
    response: [],
    currentCampaignId: sessionStorage.getItem("currentCampaignId")
  };

  componentDidMount() {
    this.callApi()
      .then(response => {
        this.setState({ response });
        console.log(this.state.response);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(
      `/api/questions/qualite/${this.state.currentCampaignId}`
    );
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
                // sourceIcon={IconCross}
              />
            )}
          </Link>
        ))}
        <Link to="/campaign/process" />
      </Fragment>
    );
  }
}

export default CampaignQualite;
