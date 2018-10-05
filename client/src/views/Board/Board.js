import React, { Component, Fragment } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Dialog from "../../components/Dialog/Dialog";

import "./Board.css";

class Board extends Component {
  state = {
    show: false,
    currentCampaign: []
  };

  toggleDialog = () => {
    this.setState({ show: !this.state.show });
  };

  // componentDidMount() {
  //   this.routeParam = this.props.match.params.id;
  //   sessionStorage.setItem("id_ft", this.routeParam);
  //   this.callApi()
  //     .then(response => {
  //       //console.log(response);
  //       this.setState({ currentCampaign: response });
  //       //console.log(this.state.currentCampaign[0].nom_camp);
  //       sessionStorage.setItem(
  //         "currentCampaignName",
  //         this.state.currentCampaign[0].nom_camp
  //       );
  //     })
  //     .catch(err => console.log(err));
  // }

  componentDidMount() {
    this.routeParam = this.props.match.params.id;
    sessionStorage.setItem("id_ft", this.routeParam);
    this.callApi()
      .then(response => {
        // console.log(response);
        this.setState({ currentCampaign: response });
        console.log(response);
        sessionStorage.setItem(
          "currentCampaignName",
          this.state.currentCampaign[0].nom_camp
        );
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const currentFtId = sessionStorage.getItem("id_ft");
    const response = await fetch(`/api/getCurrentCampaign/${currentFtId}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    if (this.state.currentCampaign.length !== 0) {
      return (
        <Fragment>
          <Header />

          <Button
            textButton="Reprendre la campagne en cours"
            classButton="createButton"
            to={{
              pathname: `/themes`
            }}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Header />

          <Button
            textButton="Démarrer une campagne"
            classButton="createButton"
            onClick={this.toggleDialog}
          />

          {this.state.show && <Dialog toggleDialog={this.toggleDialog} />}
        </Fragment>
      );
    }
  }
}
export default Board;
