import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";
import Button from "../../components/Button/Button";

class Themes extends React.Component {
  state = {
    response: [],
    currentId: sessionStorage.getItem("id_ft"),
    currentCampaignName: sessionStorage.getItem("currentCampaignName"),
    currentCampaignId: ""
  };

  //récupère l'ID de la campagne et on le stocke dans le session storage et dans le state
  componentDidMount() {
    console.log("id de la FT : ", this.state.currentId);
    console.log("nom de la campagne : ", this.state.currentCampaignName);

    this.callApi()
      .then(response => {
        console.log(response);
        this.setState({ response });
        //console.log(response);
        sessionStorage.setItem(
          "currentCampaignId",
          this.state.response[0].id_camp
        );
        this.setState({ currentCampaignId: this.state.response[0].id_camp });
        console.log("id de la campagne : ", this.state.currentCampaignId);
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

  //au click valide la campagne en changeant le statut 0--> 1
  handleClick = () => {
    console.log(this.state.currentId, this.state.currentCampaignId);
    const campaign_infos = {
      id_ft: this.state.currentId,
      id_camp: this.state.currentCampaignId
    };
    const fetch_param = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(campaign_infos)
    };

    fetch("/api/changeStatusCampaign", fetch_param)
      .then(function(results) {
        return results.json();
      })
      .then(function(myresults) {});
    window.history.go(-1);
  };

  render() {
    return (
      <Fragment>
        <Header className="buttonreturn" />
        <Link to="/campaign/process">
          <Question textQuestion="PROCESS" />
        </Link>

        <Link to="/campaign/qualite">
          <Question textQuestion="QUALITE" />
        </Link>

        <Link to="/campaign/valeurs">
          <Question textQuestion="VALEURS" />
        </Link>
        <Button
          textButton="Valider le questionnaire"
          onClick={this.handleClick}
          // to={{
          //   pathname: `/board/${this.state.currentId}`
          // }}
        />
      </Fragment>
    );
  }
}

export default Themes;
