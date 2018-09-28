import React, { Component, Fragment } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Dialog from "../../components/Dialog/Dialog";

import "./Board.css";

class Board extends Component {
  state = { show: false };

  toggleDialog = () => {
    this.setState({ show: !this.state.show });
  };

  componentDidMount() {
    this.routeParam = this.props.match.params.id;
    sessionStorage.setItem("id_ft", this.routeParam);
  }

  render() {
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
export default Board;
