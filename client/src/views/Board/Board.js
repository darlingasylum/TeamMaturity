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

  //ouvre/ferme la popup
  toggleDialog = () => {
    this.setState({ show: !this.state.show });
  };

  componentDidMount() {
    this.routeParam = this.props.match.params.id;
    sessionStorage.setItem("id_ft", this.routeParam);
    //récupère toutes les campagnes de la FT
    this.callApi()
      .then(response => {
        //inverse l'ordre pour que la dernière campagne s'affiche en 1er
        const resverseResponse = response.reverse();
        //  console.log(resverseResponse);
        //map sur la réponse et on trie la campagne en cours (statut 0) et les campagnes passées (statut 1)
        resverseResponse.map(
          e =>
            e.statut_camp === 0
              ? this.setState({ currentCampaign: e })
              : this.setState({
                  passedCampaigns: [...this.state.passedCampaigns, e]
                })
        );
        //stocke le nom de la campagne dans le session storage
        sessionStorage.setItem(
          "currentCampaignName",
          this.state.currentCampaign.nom_camp
        );
        console.log(this.state.passedCampaigns);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const currentFtId = sessionStorage.getItem("id_ft");
    const response = await fetch(`/api/getCampaigns/${currentFtId}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    this.routeParam = this.props.match.params.id;
    return (
      <Fragment>
        {this.state.show && <Dialog toggleDialog={this.toggleDialog} />}
        <Header className="buttonreturn" />

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
                pathname: `/results/${this.routeParam}/${e.id_camp}`
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
