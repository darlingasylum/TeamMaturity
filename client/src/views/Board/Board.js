import React, { Component, Fragment } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Dialog from "../../components/Dialog/Dialog";

import "./Board.css";

class Board extends Component {
  state = {
    show: false,
    currentCampaign: [],
    passedCampaigns: []
  };

  toggleDialog = () => {
    this.setState({ show: !this.state.show });
    console.log("coucou");
  };

  componentDidMount() {
    this.routeParam = this.props.match.params.id;
    sessionStorage.setItem("id_ft", this.routeParam);
    //on reçoit toutes les campagnes de la FT
    this.callApi()
      .then(response => {
        const resverseResponse = response.reverse();
        //on map sur la réponse et on trie les campagnes en cours (statut 0) et les campagnes passées (statut 1)
        resverseResponse.map(
          e =>
            e.statut_camp === 0
              ? this.setState({ currentCampaign: e })
              : this.setState({
                  passedCampaigns: [...this.state.passedCampaigns, e]
                })
        );
        // console.log(this.state.currentCampaign);
        // console.log(this.state.passedCampaigns);
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
    console.log(this.state.show);
    return (
      <Fragment>
        <Header className="buttonreturn" />
        {this.state.show && <Dialog toggleDialog={this.toggleDialog} />}
        {this.state.currentCampaign.length !== 0 ? (
          <Button
            textButton="Reprendre la campagne en cours"
            classButton="createButton"
            to={{
              pathname: `/themes`
            }}
          />
        ) : (
          <Button
            textButton="Démarrer une campagne"
            classButton="createButton"
            onClick={this.toggleDialog}
          />
        )}

        <h1> Vos précédentes campagnes :</h1>
        {this.state.passedCampaigns.length !== 0 ? (
          this.state.passedCampaigns.map(e => (
            <Button
              textButton={e.nom_camp}
              classButton="historicButton"
              to={{
                pathname: `/themes`
              }}
            />
          ))
        ) : (
          <p className="p_board">Vous n'avez pas d'historique</p>
        )}
      </Fragment>
    );
  }
}
export default Board;
