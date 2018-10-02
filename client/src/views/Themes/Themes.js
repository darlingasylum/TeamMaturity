import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";

class Themes extends React.Component {
  state = {
    response: [],
    currentId: sessionStorage.getItem("id_ft"),
    currentCampaignName: sessionStorage.getItem("currentCampaignName")
  };

  componentDidMount() {
    this.callApi()
      .then(response => {
        // console.log(response);
        this.setState({ response });
        sessionStorage.setItem(
          "currentCampaignId",
          this.state.response[0].id_camp
        );
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(
      `/api/campaign_id/${this.state.currentId}/${
        this.state.currentCampaignName
      }`
    );
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <Fragment>
        <Header />
        <Link to="/campaign/process">
          <Question textQuestion="PROCESS" />
        </Link>
        ;
        <Link to="/campaign/qualite">
          <Question textQuestion="QUALITE" />
        </Link>
        ;
        <Link to="/campaign/valeurs">
          <Question textQuestion="VALEURS" />
        </Link>
        ;
      </Fragment>
    );
  }
}

export default Themes;
